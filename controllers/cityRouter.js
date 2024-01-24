const cityRouter = require('express').Router()
const { getParks } = require('../lib/yelp.js')
const { getWeather } = require('../lib/weather.js')
const {  getGamesFromDB, postGameToDB,  } = require('../lib/supabase/games.js')
const { getParksFromDB, getParkFromDB, postParksToDB,getTest } = require('../lib/supabase/parks.js')
const { postCityToDB } = require('../lib/supabase/city.js')

// pull from supabase
// if not in supabase, request api, then add to supabase
cityRouter.get('/', (req, res) => {
  res.send('Hello')
})

cityRouter.get('/:state/:city/parks', async (req, res) => {
  oneDay = 60 * 60 * 24
  res.setHeader('Cache-Control', `s-max-age=${oneDay}, stale-while-revalidate`);
  const state = req.params.state, city = req.params.city
  let parks
  try {
    parks = await getParksFromDB(city, state)
  } catch {
    console.log('failed db fetch')
    parks = await getParks(city, state)
    await postParksToDB(parks)
  }

  res.json(parks)
});
cityRouter.get('/parks/:parkId', async (req, res) => {
  const parkId = req.params.parkId
  const park = await getParkFromDB(parkId)

  res.json(park)
});
cityRouter.get('/parks/:parkId/games', async (req, res) => {
  console.log('called')
  const parkId = req.params.parkId
  const games = await getGamesFromDB(parkId)
  console.log(games)
  res.json(games)
});

// server side cache this
cityRouter.get('/:state/:city/weather', async (req, res) => {
  const state = req.params.state, city = req.params.city

  const weather = await getWeather(city, state)
  res.json(weather)
});

cityRouter.post('/parks/:parkId/games', async (req, res) => {
  const { gameName, gameType, maxPlayers, playerCount } = req.body
  const parkId = req.params.parkId
  const game = {
    'id': parkId,
    'game_name': gameName,
    'game_type': gameType,
    'max_players': maxPlayers,
    'player_count': playerCount
  }
  console.log(game)
  await postGameToDB(parkId, game)
});

module.exports = cityRouter;