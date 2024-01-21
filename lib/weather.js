async function getWeather(city, state) {
  const url = process.env.WEATHER_API_URL
  const weatherApiKey = process.env.WEATHER_API_KEY

  const response = await fetch(`${url}q=${city},${state},US&units=imperial&appid=${weatherApiKey}`)
  const data = await response.json()

  return data
}


module.exports = { getWeather }