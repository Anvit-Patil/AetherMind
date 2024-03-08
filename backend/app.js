require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require("openai");

const app = express();
const todo = require('./utils/todo/td_routes');
const chat = require('./utils/chat/chat_routes');
app.use(express.json());
app.use(bodyParser.json());
app.use('/todos', todo);
app.use('/chat', chat);


module.exports = app;