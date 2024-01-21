const cityRouter = require('express').Router()
const { getParks } = require('../lib/yelp.js')
const { getWeather } = require('../lib/weather.js')
const {  getParksFromDB, getParkFromDB, postParksToDB } = require('../lib/supabase.js')

// pull from supabase
// if not in supabase, request api, then add to supabase
cityRouter.get('/', (req, res) => {
  res.send('Hello')
})

cityRouter.get('/:state/:city/parks', async (req, res) => {
  const state = req.params.state, city = req.params.city
  console.log(city)
  let parks
  try {
    parks = await getParksFromDB(city, state)
  } catch {
    parks = await getParks(city, state)
    await postParksToDB(parks)
  }

  res.json(parks)
});

// server side cache this
cityRouter.get('/:state/:city/weather', async (req, res) => {
  const state = req.params.state, city = req.params.city

  const weather = await getWeather(city, state)
  res.json(weather)
});

module.exports = cityRouter;