require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require("openai");

const app = express();
const todo = require('./utils/todo/td_routes');
const chat = require('./utils/chat/chat_routes');
const userRoutes = require('./utils/Login/login_routes');

const auth = require('./common/auth')

app.use(bodyParser.json());

app.use('/user', userRoutes);
//protected
app.use('/todos', auth, todo);
app.use('/chat', auth, chat);


module.exports = app;