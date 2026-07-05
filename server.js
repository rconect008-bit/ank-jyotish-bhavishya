const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/numerology', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'numerology.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Unable to load numerology data.' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`अंक ज्योतिष भविष्य चालू आहे: http://localhost:${PORT}`);
});
