const { createClient } = require('@supabase/supabase-js');
const url = process.env.SUPABASE_API_URL
const supabaseApiKey = process.env.SUPABASE_API_KEY
const supabase = createClient(url, supabaseApiKey)

module.exports = { supabase }