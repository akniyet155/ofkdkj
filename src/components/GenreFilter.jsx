export default function GenreFilter({ genres, current, onChange, t }) {
  return (
    <select value={current} onChange={e => onChange(e.target.value)}>
      <option value="all">{t("all")}</option>
      {genres.map(g => (
        <option key={g} value={g}>{g}</option>
      ))}
    </select>
  )
}
