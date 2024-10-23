const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { connectDb,dbClient } = require('./connectdb');

connectDb();
app.use(express.json());

