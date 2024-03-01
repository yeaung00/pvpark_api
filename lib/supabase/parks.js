const { supabase } = require('./client.js')

async function getParksFromDB(city, state) {
  try {
    const { data } = await supabase
      .from('parks')
      .select('*')
      .eq('near_by', `${city},${state}`)
    if (data.length == 0) throw new Error('not found')
    return data
  } catch (error) {
    throw (error)
  }
}

async function getParkFromDB(parkId) {
  try {
    const { data } = await supabase
      .from('parks')
      .select()
      .eq('id', parkId)
    return data[0]
  } catch (error) {
    throw(error)
  }
}

async function postParksToDB(parks) {
  try {
    const { error } = await supabase
      .from('parks')
      .upsert(parks, { ignoreDuplicates: false })
  }
  catch (error) {
    throw(error)
  }
}

async function updatePark(park, parkId) {
  try {
    await supabase
      .from('parks')
      .update(park)
      .eq('id', parkId)
  } catch (error) {
    throw(error)
  }
}

module.exports = {
  getParksFromDB,
  getParkFromDB,
  postParksToDB,
  updatePark,
}