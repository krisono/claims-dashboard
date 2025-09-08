const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Basic routes
app.get('/', (req, res) => {
  res.json({ message: 'Claims Dashboard API' });
});

app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: 'Server is working' });
});

app.get('/api/claims', (req, res) => {
  res.json([
    { id: 1, title: 'Test Claim', status: 'OPEN' }
  ]);
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`🚀 JS server running on http://localhost:${PORT}`);
});
