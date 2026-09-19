export default function ProjectCard({ project }) {
  // Determine color based on confidence score
  const scoreColor = project.score >= 70 ? '#059669' : project.score >= 40 ? '#d97706' : '#dc2626'

  return (
    <div style={{ border: '1px solid #e1e4e8', borderRadius: '8px', padding: '18px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>{project.name}</h3>
          <span style={{ fontSize: '13px', color: '#6b7280' }}>Built: {project.date}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ 
            background: `${scoreColor}15`, 
            color: scoreColor, 
            padding: '4px 8px', 
            borderRadius: '6px', 
            fontSize: '12px', 
            fontWeight: 'bold' 
          }}>
            {project.score}% Match
          </span>
          {project.winner && (
            <span style={{ background: '#e6fffa', color: '#047857', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>
              🏆 Winner
            </span>
          )}
        </div>
      </div>
      
      <p style={{ margin: 0, color: '#374151', lineHeight: '1.5' }}>{project.description}</p>
      
      <div style={{ padding: '10px', background: '#f3f4f6', borderRadius: '6px', fontSize: '14px', color: '#1f2937' }}>
        <strong>Tech Stack:</strong> {project.stack}
      </div>
      
      <div style={{ marginTop: '4px' }}>
        <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          View Source Code →
        </a>
      </div>
    </div>
  )
}