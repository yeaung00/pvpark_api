const { supabase } = require('./client.js')

async function signIn() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
}

module.exports = {
  signIn,
}
