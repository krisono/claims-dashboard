import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Basic routes without external imports
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
  console.log(`🚀 Minimal server running on http://localhost:${PORT}`);
});
