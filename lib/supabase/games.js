const { supabase } = require('./client.js')

async function getGamesFromDB(parkId) {
  const { data, error } = await supabase
    .from('games')
    .select()
    .eq('park_id', parkId)
  if (error) {
    throw(error)
  }
  return data
}
async function postGameToDB(parkId, game) {
  try {
    const { error } = await supabase
      .from('games')
      .insert(game)
  } catch (error){
    throw(error)
  }
}

module.exports = {
  getGamesFromDB,
  postGameToDB,
}