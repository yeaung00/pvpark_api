const { supabase } = require('./client.js')

async function getGamesFromDB(parkId) {
  const { data, error } = await supabase
    .from('games')
    .select()
    .eq('id', parkId)
  if (error) {
    console.log(error)
  }
  return data
}
async function postGameToDB(parkId, game) {
  // try {
  const { error } = await supabase
    .from('games')
    .insert(game)
  if (error) {
    console.log(error)
  }
  // } catch (e){
  //   console.log(e)
  // }
}

module.exports = {
  getGamesFromDB,
  postGameToDB,
}