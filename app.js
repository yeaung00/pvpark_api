const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cityRouter = require('./controllers/cityRouter');
app.use(express.json());
app.use(cors());

app.get('/', (_, res) => res.redirect('/api/ca/santa cruz/parks'));
app.use('/api', cityRouter)

app.listen(3001, () => console.log('listening on port http://localhost:3001'))

module.exports = app;