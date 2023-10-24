// Bring in our dependencies
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const mongoose = require('mongoose');

require('dotenv').config()

const dbURL = process.env.MONGODB_URL;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB!');
});

const PORT = 3000;

const app = express();

app.use(express.json());

// enable cors
app.use(cors());
app.options('*', cors());

//  Connect all our routes to our application
app.use('/', routes);

// Turn on that server!
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
