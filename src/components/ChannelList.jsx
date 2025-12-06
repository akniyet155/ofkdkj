export default function ChannelList({ channels, onSelect, t, lang, renderExtra }) {
  if (!channels.length) return <div>{t("noChannels")}</div>
  return (
    <ul>
      {channels.map(ch => (
        <li 
          key={ch.id} 
          onClick={() => onSelect(ch)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <img src={ch.logo} alt="" width={36} height={24} style={{ verticalAlign: 'middle' }} />
            <span style={{ marginLeft: 8 }}>{ch.name[lang]}</span>
          </div>
          {renderExtra && <div style={{ marginLeft: '8px' }}>{renderExtra(ch)}</div>}
        </li>
      ))}
    </ul>
  )
}
