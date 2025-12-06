export default function FavoriteButton({ channel, isFavorite, onToggle }) {
  return (
    <button
      onClick={() => onToggle(channel.id)}
      style={{
        background: isFavorite ? 'var(--accent)' : 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        color: '#ffffff',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
      }}
      onMouseEnter={(e) => {
        if (!isFavorite) e.target.style.background = 'rgba(102, 126, 234, 0.3)';
      }}
      onMouseLeave={(e) => {
        if (!isFavorite) e.target.style.background = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {isFavorite ? '⭐' : '☆'}
    </button>
  );
}
