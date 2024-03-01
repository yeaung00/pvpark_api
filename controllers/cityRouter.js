const cityRouter = require('express').Router()
const { getParks } = require('../lib/yelp.js')
const { getWeather } = require('../lib/weather.js')
const {  getGamesFromDB, postGameToDB,  } = require('../lib/supabase/games.js')
const { getParksFromDB, getParkFromDB, postParksToDB, updatePark } = require('../lib/supabase/parks.js')
const { postCityToDB } = require('../lib/supabase/city.js')

cityRouter.get('/', (req, res) => {
  res.send('Hello')
})

cityRouter.get('/:state/:city/parks', async (req, res) => {
  const state = req.params.state, city = req.params.city
  let parks = await getParks(city, state)
  res.json(parks)
});

cityRouter.get('/:state/:city/weather', async (req, res) => {
  const state = req.params.state, city = req.params.city
  const weather = await getWeather(city, state)
  res.json(weather)
});

cityRouter.post('/parks/:parkId/games', async (req, res) => {
  const { name, gameType, maxPlayers } = req.body
  const parkId = req.params.parkId
  const game = {
    park_id: parkId,
    name,
    game_type: gameType[0].toUpperCase() + gameType.slice(1),
    max_players: maxPlayers,
    player_count: 1
  }
  const games = await getGamesFromDB(parkId)
  const playerCounts = games.map(game => game.player_count)
  const totalPlayers = playerCounts.reduce((total, count) => total + count, 0)
  let park = await getParkFromDB(parkId)
  park = {...park, player_count: totalPlayers}
  await postGameToDB(parkId, game)
  await updatePark(park, parkId)
  res.send(`Game: ${name} posted in park: ${parkId}`).status(200)
});

module.exports = cityRouter;