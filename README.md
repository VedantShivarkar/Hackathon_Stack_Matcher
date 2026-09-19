Markdown
# Hackathon Stack Matcher 🏆

A real-time search engine designed to help developers brainstorm and plan competitive hackathon projects. Instead of manually digging through repositories, input a theme (e.g., "smart agriculture", "blockchain", "anomaly detection") and instantly surface historically winning projects, their problem statements, and battle-tested tech stacks.

## 🚀 Features

* **Live GitHub Data:** Queries the GitHub REST API on startup to fetch the most recent repositories tagged with `hackathon-winner`.
* **Smart Search Algorithm:** Uses a hybrid search engine combining Scikit-Learn's `TfidfVectorizer` (for semantic context) and strict keyword matching to generate a highly accurate Confidence Score (0-100%).
* **Rapid UI:** A lightweight React frontend that displays project cards with build dates, tech stacks, and direct source code links.
* **Easter Egg:** Try searching for `ishuu` or `vedu` for a hidden UI surprise! 

## 🛠️ Tech Stack

**Backend**
* Python 3.x
* FastAPI (REST API framework)
* Pandas (Data manipulation)
* Scikit-Learn (TF-IDF vectorization & Cosine Similarity)

**Frontend**
* React 18
* Vite (Build tool)
* Axios (API requests)

## 💻 Local Setup & Installation

### 1. Clone the Repository
```bash
git clone [https://github.com/VedantShivarkar/Hackathon_Stack_Matcher.git](https://github.com/VedantShivarkar/Hackathon_Stack_Matcher.git)
cd Hackathon_Stack_Matcher
2. Start the Backend (FastAPI)
Open a terminal and navigate to the backend folder:

Bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\Activate.ps1
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
Note: On startup, the backend will fetch the latest live data from GitHub. Wait for the "Live data ingested" log before searching.

3. Start the Frontend (React + Vite)
Open a second terminal and navigate to the frontend folder:

Bash
cd frontend
npm install
npm run dev
4. Use the App
Open your browser and navigate to http://localhost:5173. Type a theme into the search bar and explore the results.

📝 License
Created by Vedant Shivarkar. Open source and available for modification.


To upload this to your repository, run these commands in your root terminal:
```powershell
git add README.md
git commit -m "Add project README"
git push
