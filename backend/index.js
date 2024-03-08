require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require("openai");

// const app = express();

const app = require('./app')

// Middleware


const port = 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
