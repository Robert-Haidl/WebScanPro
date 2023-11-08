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
        await axios.head(url).then(response => res.status(200).json({ response: response.headers }))
    } catch (error) {
      res.status(502).json({ error: 'Bad Gateway: Error while fetching the URL. '+error });
    }
  });

module.exports = router;