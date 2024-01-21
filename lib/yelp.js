async function getParks(city, state) {
  const url = process.env.YELP_API_URL
  const headers = {
    'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
    'Content-Type': 'application/json',
  }
  const response = await fetch(`${url}sort_by=best_match&term=parks&location=${city}, ${state}&limit=20`, { headers })
  let data = (await response.json()).businesses

  data = data.map(({name, image_url, location}) => ({
    name, 
    image_url, 
    address: location.address1, 
    city: location.city.toLowerCase(), 
    state: location.state.toLowerCase(),
    player_count: 0,
  }))

  return data
}

module.exports = { getParks }