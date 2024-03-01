const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cityRouter = require('./controllers/cityRouter');
const userRouter = require('./controllers/userRouter');
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
const corsOptions = cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://pvpark-frontend.vercel.app/'],
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
;
app.use(corsOptions);

app.get('/', (_, res) => res.redirect('/api'));
app.use('/api', cityRouter)
app.use('/api/users', userRouter)

app.listen(3001, () => console.log('listening on port http://localhost:3001'))

module.exports = app;