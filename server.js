const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist/spa
app.use(express.static(path.join(__dirname, 'dist/spa')));

// Handle React Router (spa)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/spa', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});