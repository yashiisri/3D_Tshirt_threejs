import express from 'express';
import axios from 'axios'; // Using axios for HTTP requests

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://api.gemini.com/v2/images/generate'; // Update with actual Gemini API endpoint

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Send request to Gemini API
    const response = await axios.post(GEMINI_API_URL, {
      prompt: prompt,
      n: 1,
      size: "1024x1024", // Adjust if necessary based on Gemini API specs
    }, {
      headers: {
        'Authorization': `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    // Handle response based on Gemini API's structure
    const imageUrl = response.data.imageUrl; // Adjust according to Gemini API response
    res.json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

export default router;

