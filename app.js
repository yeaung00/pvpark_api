const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cityRouter = require('./controllers/cityRouter');
app.use(express.json());
const corsOptions = [
  cors({
    origin: 'http://localhost:5173',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
];
app.use(corsOptions);

app.get('/', (_, res) => res.redirect('/api'));
app.use('/api', cityRouter)

app.listen(3001, () => console.log('listening on port http://localhost:3001'))

module.exports = app;