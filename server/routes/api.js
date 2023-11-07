const express = require('express');
const router = express.Router();
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/scan', (req, res) => {
    const url = req.body.url;
    if (!url) {
      res.status(400).send('URL is required in the request body.');
      return;
    }
    apiProxy.web(req, res, { target: url });
});

module.exports = router;