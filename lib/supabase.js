const { createClient } = require('@supabase/supabase-js');
const url = process.env.SUPABASE_API_URL
const supabaseApiKey = process.env.SUPABASE_API_KEY
const supabase = createClient(url, supabaseApiKey)

async function getParksFromDB(city, state) {
  const { data, error } = await supabase
    .from('parks')
    .select()
    .eq('city', city)
    .eq('state', state)
  
  if (error || !data.length) {
    console.log(error)
    throw(error)
  }
  return data
}

async function getParkFromDB(city, state) {
  
}

async function postParksToDB(parks) {
  const { error } = await supabase
    .from('parks')
    .insert(parks)
  if (error) {
    throw(error)
  }
}

module.exports = { getParksFromDB, getParkFromDB, postParksToDB }