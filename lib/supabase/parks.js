const { supabase } = require('./client.js')

async function getParksFromDB(city, state) {

  console.log('park get req')
  try {
    const { data } = await supabase
      .from('parks')
      .select('*')
      .eq('near_by', `${city},${state}`)
    if (data.length == 0) throw new Error('not found')
    return data
  } catch (error) {
    console.log(error, 'failed park get')
    throw (error)
  }
}

async function getParkFromDB(parkId) {
  try {
    const { data } = await supabase
      .from('parks')
      .select()
      .eq('id', parkId)
    return data
  } catch (error) {
    throw(error)
  }
  
}

async function postParksToDB(parks) {
  console.log('park post req', parks)
  try {
    const { error } = await supabase
      .from('parks')
      .upsert(parks, { ignoreDuplicates: false })
  }
  catch (error) {
    console.log(error, 'failed park post')
    throw(error)
  }
}

async function getTest() {
  console.log('terst')
  try {
    const { data} = await supabase
    .from('test')
    .select()
    // .eq('test_arr', "boo")
  } catch (e) {
    console.log(e)
  }
  return data
}

module.exports = {
  getParksFromDB,
  getParkFromDB,
  postParksToDB,
  getTest
}