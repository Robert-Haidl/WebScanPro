const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/scan', async (req, res) => {
    const url = req.body.url;
  
    if (!url) {
      res.status(400).json({ error: 'URL is required in the request body.' });
      return;
    }
  
    try {
      const response = await axios.head(url); // Use axios.head to retrieve only the response headers
  
      const responseHeaders = response.headers; // Extract the response headers
  
      res.status(200).json({ headers: responseHeaders });
    } catch (error) {
      res.status(502).json({ error: 'Bad Gateway: Error while fetching the URL.' });
    }
  });

module.exports = router;