const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import cors middleware
const app = express();
const port = 4000; // Backend server on port 4000

// Enable CORS for requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000', // Allow only localhost:3000 to access the API
  methods: 'GET', // Allow only GET requests
  allowedHeaders: 'Content-Type',
}));

app.get('/bhavcopy', async (req, res) => {
  const url = req.query.url;
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' }); // 'arraybuffer' for binary data (like zip files)
    res.set('Content-Type', 'application/zip');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching Bhavcopy:', error);
    res.status(500).send('Error fetching Bhavcopy data');
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
