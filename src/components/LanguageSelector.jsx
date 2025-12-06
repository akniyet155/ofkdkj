export default function LanguageSelector({ current, onChange, languages }) {
  return (
    <select value={current} onChange={e => onChange(e.target.value)}>
      {languages.map(l => (
        <option key={l} value={l}>{l.toUpperCase()}</option>
      ))}
    </select>
  )
}
