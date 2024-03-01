const { supabase } = require('./client.js')

async function postCityToDB(city, state) {
  try {
    await supabase
      .from('cities')
      .insert({ state, name: city })
  } catch (error) {
    throw(error)
  }
}

module.exports = {
  postCityToDB
}