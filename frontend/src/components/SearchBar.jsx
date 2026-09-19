export default function SearchBar({ query, setQuery, onSearch, loading }) {
  return (
    <form onSubmit={onSearch} style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., smart agriculture, react, messaging, block chain..."
        style={{
          flex: 1,
          padding: '12px 16px',
          fontSize: '15px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      />
      <button
        type="submit"
        disabled={loading}
        style={{
          padding: '12px 24px',
          fontSize: '15px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}