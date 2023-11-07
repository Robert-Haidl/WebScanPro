const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Load your JSON Swagger specification file
const cors = require('cors');
const app = express();
const apiProxy = httpProxy.createProxyServer();

app.use(bodyParser.json());

app.use(cors());
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/api', (req, res) => {
  const url = req.body.url;
  if (!url) {
    res.status(400).send('URL is required in the request body.');
    return;
  }
  apiProxy.web(req, res, { target: url });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
