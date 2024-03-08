require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI = require("openai");
const router = express.Router();

// Middleware
// app.use(bodyParser.json());

// Initialize the OpenAI API with your API key
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

// This object will store conversation histories keyed by a session identifier
// For simplicity, this example uses a single session for all users.
// In a real application, you would want to generate a unique session ID for each conversation.
let sessions = {
  // Example session ID with an empty conversation history
  'default_session': []
};

const createchat = async (req, res) => {
    const { message, sessionId = 'default_session' } = req.body;
  
    // Initialize session if it doesn't exist
    if (!sessions[sessionId]) {
      sessions[sessionId] = [];
    }
  
    // Add user's message to the session history
    sessions[sessionId].push({ role: 'user', content: message });
  
    try {
      const gptResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", 
        messages: sessions[sessionId], // Use the conversation history
        stream: true,
      });
  
      let result = '';
      for await (const chunk of gptResponse) {
        const content = chunk.choices[0]?.delta?.content || '';
        result += content;
      }
  
      // Add the AI's response to the session history
      if (result.trim().length > 0) {
        sessions[sessionId].push({ role: 'assistant', content: result.trim() });
      }
  
      console.log(result);
      res.json({ response: result });
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      res.status(500).send('Error processing your message');
    }
  }

  module.exports = {
    createchat
  }

