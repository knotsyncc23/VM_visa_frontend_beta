import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist/spa
app.use(express.static(join(__dirname, 'dist/spa')));

// Handle React Router (spa)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist/spa', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});