const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

app.post('/scan', async (req, res) => {
    const url = req.body.url;
  
    if (!url) {
      res.status(400).json({ error: 'URL is required in the request body.' });
      return;
    }
  
    try {
      const response = await axios.get(url);
  
      // Assuming that the response from the URL is already in JSON format
      res.status(200).json(response.data);
    } catch (error) {
      res.status(502).json({ error: 'Bad Gateway: Error while fetching the URL.' });
    }
  });
module.exports = router;