const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());

app.post('/receive-location', (req, res) => {
  // IMPORTANT: validate and authenticate requests in real deployment
  const record = {
    time: new Date().toISOString(),
    ip: req.ip,
    body: req.body
  };
  // append to a file (for demo only). In prod: use a protected DB and proper access controls.
  fs.appendFileSync('locations.log', JSON.stringify(record) + '\n');
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 443;
app.listen(PORT, () => console.log('server listening on', PORT));
