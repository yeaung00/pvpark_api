const { signIn } = require('../lib/supabase/user')

const userRouter = require('express').Router()

userRouter.get('/signin', async (req, res) => {
  signIn()
})

module.exports = userRouter