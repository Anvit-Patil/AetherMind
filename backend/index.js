require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const OpenAI = require("openai");
const connectDB = require("./config/db");

// const app = express();

const app = require("./app");

// Middleware

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
