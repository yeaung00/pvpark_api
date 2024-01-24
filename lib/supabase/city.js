const { supabase } = require('./client.js')

async function postCityToDB(city, state) {
  await supabase
    .from('cities')
    .insert({ state, name: city })
}

module.exports = {
  postCityToDB
}