import { useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import ProjectCard from './components/ProjectCard'

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [easterEgg, setEasterEgg] = useState(null) // New state for the special search

  const handleSearch = async (e) => {
    e.preventDefault()
    
    const cleanQuery = query.trim().toLowerCase()
    if (!cleanQuery) return

    setSearched(true)

    // --- Easter Egg Logic ---
    if (cleanQuery === 'ishuu') {
      setEasterEgg({ text: 'vedu', size: '80px' })
      setResults([])
      return
    }
    if (cleanQuery === 'vedu') {
      setEasterEgg({ text: 'ishuu❤️💕', size: '80px' }) // Big text for ishuu
      setResults([])
      return
    }
    // Clear easter egg if it's a normal search
    setEasterEgg(null)
    // ------------------------

    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:8000/search?query=${encodeURIComponent(query)}`)
      setResults(res.data)
    } catch (err) {
      console.error('API Error:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '760px', margin: '40px auto', padding: '0 20px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '28px' }}>Hackathon Stack Matcher</h1>
        <p style={{ margin: 0, color: '#6b7280' }}>
          Search project themes to find real, winning problem statements and battle-tested stacks.
        </p>
      </header>

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loading={loading}
      />

      {/* Render the Easter Egg if activated */}
      {easterEgg ? (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '60px', 
          color: '#ff69b4', // Hot pink
          fontSize: easterEgg.size,
          fontWeight: 'bold',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          {easterEgg.text}
        </div>
      ) : (
        /* Otherwise, render normal results */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {results.map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
          {searched && !loading && results.length === 0 && !easterEgg && (
            <p style={{ color: '#6b7280', textAlign: 'center', marginTop: '20px' }}>
              No matching projects found. Try different terms or broaden your search.
            </p>
          )}
        </div>
      )}
    </div>
  )
}