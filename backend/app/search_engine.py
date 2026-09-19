import requests
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime

class SearchEngine:
    def __init__(self):
        self.df = pd.DataFrame()
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = None

    def fetch_live_data(self):
        url = "https://api.github.com/search/repositories?q=topic:hackathon-winner&sort=updated&order=desc&per_page=100"
        headers = {"Accept": "application/vnd.github.v3+json"}
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            print("API Rate limit hit or network error. Try again later.")
            return

        items = response.json().get("items", [])
        data = []
        
        for item in items:
            topics = item.get("topics", [])
            language = item.get("language")
            if language and language.lower() not in topics:
                topics.insert(0, language)
            
            raw_date = item.get("created_at", "")
            date_str = datetime.strptime(raw_date, "%Y-%m-%dT%H:%M:%SZ").strftime("%b %Y") if raw_date else "Unknown"

            data.append({
                "project_name": item.get("name", "").replace("-", " ").title(),
                "description": item.get("description") or "No description provided.",
                "tech_stack": ", ".join(topics) if topics else "Not specified",
                "date": date_str,
                "url": item.get("html_url", ""),
                "is_winner": True
            })
        
        self.df = pd.DataFrame(data).fillna("")
        self.df["search_corpus"] = self.df["project_name"] + " " + self.df["description"] + " " + self.df["tech_stack"]
        
        if not self.df.empty:
            self.tfidf_matrix = self.vectorizer.fit_transform(self.df["search_corpus"])

    def initialize(self):
        self.fetch_live_data()

    def search(self, query: str, limit: int = 10):
        if not query or self.tfidf_matrix is None or self.df.empty:
            return []
            
        # 1. TF-IDF Contextual Score
        query_vec = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        
        # 2. Strict Keyword Score
        query_words = set(query.lower().split())
        
        results = []
        for idx in range(len(self.df)):
            tfidf_score = float(similarities[idx])
            corpus = self.df.iloc[idx]["search_corpus"].lower()
            
            # Calculate what percentage of searched words are present
            match_count = sum(1 for word in query_words if word in corpus)
            keyword_ratio = match_count / len(query_words) if query_words else 0
            
            # Blend: 70% weight to exact keywords, 30% to semantic relevance
            confidence = (keyword_ratio * 0.7) + (tfidf_score * 0.3)
            
            if confidence > 0.15:  # Filter out weak matches below 15%
                row = self.df.iloc[idx]
                results.append({
                    "name": row["project_name"],
                    "description": row["description"],
                    "stack": row["tech_stack"],
                    "date": row["date"],
                    "url": row["url"],
                    "winner": bool(row["is_winner"]),
                    "score": round(confidence * 100, 1) # Output as a percentage
                })
                
        # 3. Sort by the highest confidence score
        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:limit]