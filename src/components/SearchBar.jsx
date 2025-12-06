export default function SearchBar({ value, onChange, t }) {
  return (
    <div style={{
      position: 'relative',
      marginBottom: '16px'
    }}>
      <input
        type="text"
        placeholder="🔍 Search channels..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: '2px solid var(--border-color)',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          fontSize: '14px',
          fontWeight: '500',
          outline: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-color)';
          e.target.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}
