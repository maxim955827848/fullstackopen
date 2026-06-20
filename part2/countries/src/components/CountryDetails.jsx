import WeatherReport from './WeatherReport'

const CountryDetails = ({ nation }) => {
  const languages = Object.values(nation.languages || {})

  return (
    <div>
      <h2>{nation.name.common}</h2>
      <p>capital {nation.capital?.[0]}</p>
      <p>area {nation.area}</p>

      <h4>languages:</h4>
      <ul>
        {languages.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img 
        src={nation.flags.png} 
        alt={`Flag of ${nation.name.common}`} 
        style={{ width: '150px', border: '1px solid #ccc' }} 
      />

      {nation.capital?.[0] && <WeatherReport city={nation.capital[0]} />}
    </div>
  )
}

export default CountryDetails