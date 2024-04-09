const express = require('express');
const OpenAI = require("openai");
// const openai = new OpenAI();
const openai = new OpenAI({
  apiKey:'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'
});
const cors = require('cors');

const app = express();
const port = 3000; // Set your desired port
app.use(express.json());
app.use(cors());


app.post('/generate-reply', async (req, res) => {
  const { outline } = req.body;

  try {
    const sys_prompt= `Generate a short message to enthusiastically to given outline, say... outline: message:`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: sys_prompt },
        { role: "user", content: outline },
      ],
      max_tokens: 60,
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('Error generating reply:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/generate-synopsis', async (req, res) => {
  const { outline } = req.body;
  console.log("outline", outline)

  try {
 
    const sys_prompt = `Generate an engaging, professional and marketable movie scripy from given outline synopsis, dont give titles`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: sys_prompt },
        { role: "user", content: outline },
      ],
    });
    const synopsis =  response.choices[0].message.content;
    res.json({ synopsis: synopsis});
  } catch (error) {
    console.error('Error generating synopsis:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/generate-title', async (req, res) => {
  const { synopsis } = req.body;

  try {
    const sys_prompt = `Generate a catchy movie title for this synopsis: ${synopsis}`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: sys_prompt },
        { role: "user", content: synopsis },
      ],
      max_tokens: 60,
    });

    const title =  response.choices[0].message.content;
    res.json({ title });
  } catch (error) {
    console.error('Error generating title:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/extract-stars', async (req, res) => {
  const { synopsis } = req.body;

  try {
    const sys_prompt = `Extract the names in brackets from the synopsis... synopsis: ${synopsis} names:`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: sys_prompt },
        { role: "user", content: synopsis },
      ],
      max_tokens: 60,
    });

    res.json({ stars:  response.choices[0].message.content });
  } catch (error) {
    console.error('Error extracting stars:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/generate-image-description', async (req, res) => {
  const { title, synopsis } = req.body;

  try {
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   prompt: `Give a short description of an image... title: ${title} synopsis: ${synopsis} image description:`,
    //   temperature: 0.8,
    //   max_tokens: 100,
    // });

    res.json({ imageDescription: 'response.choices[0].message.content' });
  } catch (error) {
    console.error('Error generating image description:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
