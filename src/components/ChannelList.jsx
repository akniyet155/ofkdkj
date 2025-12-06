export default function ChannelList({ channels, onSelect, t, lang }) {
  if (!channels.length) return <div>{t("noChannels")}</div>
  return (
    <ul>
      {channels.map(ch => (
        <li key={ch.id} onClick={() => onSelect(ch)}>
          <img src={ch.logo} alt="" width={36} height={24} style={{ verticalAlign: 'middle' }} />
          <span style={{ marginLeft: 8 }}>{ch.name[lang]}</span>
        </li>
      ))}
    </ul>
  )
}
