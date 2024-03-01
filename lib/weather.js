async function getWeather(city, state) {
  const url = process.env.WEATHER_API_URL
  const weatherApiKey = process.env.WEATHER_API_KEY

  const response = await fetch(`${url}q=${city},${state},US&units=imperial&appid=${weatherApiKey}`)
  let data = await response.json()
  const sunrise = new Date(data.sys.sunrise * 1000)
    .toLocaleTimeString()
    .split(':')
    .slice(0, 2)
    .join(':')
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()
    .split(':')
    .slice(0, 2)
    .join(':')
  data = {
    icon_id: data.weather[0].icon,
    description: data.weather[0].main,
    temp: Math.round(data.main.temp),
    wind_speed: data.wind.speed,
    sunrise: sunrise + ' AM',
    sunset: sunset + ' PM',
  }
  return data
}


module.exports = { getWeather }