import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Basic routes
app.get('/', (req, res) => {
  console.log('Root route hit');
  res.json({ 
    message: 'Claims Dashboard API - Working!',
    timestamp: new Date().toISOString(),
    endpoints: ['/api/ping', '/api/claims']
  });
});

app.get('/api/ping', (req, res) => {
  console.log('Ping route hit');
  res.json({ ok: true, message: 'Server is working', port: 5001 });
});

app.get('/api/claims', (req, res) => {
  console.log('Claims route hit');
  res.json([
    { id: 1, title: 'Test Claim 1', status: 'OPEN' },
    { id: 2, title: 'Test Claim 2', status: 'PENDING' }
  ]);
});

const PORT = 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Clean server on http://localhost:${PORT}`);
  console.log(`✅ Available routes:`);
  console.log(`   GET http://localhost:${PORT}/`);
  console.log(`   GET http://localhost:${PORT}/api/ping`);
  console.log(`   GET http://localhost:${PORT}/api/claims`);
});
