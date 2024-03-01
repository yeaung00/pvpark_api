function filterCategories(categories) {
  const hasSports = (category) => category == 'football' || category == 'basketballcourts' || category == 'baseballfields'
  categories = categories.filter(category => hasSports(category.alias))
  const aliasMap = {
    'basketballcourts': 'Basketball',
    'football': 'Soccer',
    'baseballfields': 'Baseball'
  }
  return categories.map(category => aliasMap[category.alias])
}
async function getParks(city, state) {
  const url = process.env.YELP_API_URL
  const headers = {
    'Authorization': `Bearer ${process.env.YELP_API_KEY}`,
    'Content-Type': 'application/json',
  }
  const response = await fetch(`${url}sort_by=best_match&term=parks&categories=basketballcourts,baseballfields,football&location=${city}, ${state}&limit=20`, { headers })
  let data = (await response.json()).businesses
  data = data.map(({name, image_url, location, categories, id }) => {
    categories = filterCategories(categories)
    return ({
      id,
      name, 
      categories,
      image_url, 
      address: location.address1, 
      city: location.city,
      state: location.state,
      player_count: 0,
      near_by: `${city},${state}`,
    })
  })

  return data
}

module.exports = { getParks }