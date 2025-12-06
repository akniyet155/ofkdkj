export default function CountryFilter({ countries, current, onChange, t }) {
  return (
    <select value={current} onChange={e => onChange(e.target.value)}>
      <option value="all">{t("all")}</option>
      {countries.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  )
}
