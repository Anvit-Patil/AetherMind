require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const OpenAI  = require("openai");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Initialize the OpenAI API with your API key
const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  console.log(message)
  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Make sure to use an available model
      messages: [{ role: 'user', content: message }],
      stream: true,
    });
    let result =''
    for await (const chunk of gptResponse) {

        result += chunk.choices[0]?.delta?.content || '';
      }
    console.log(result)

    res.json({ response: result });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).send('Error processing your message');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});