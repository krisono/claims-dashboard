import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Basic routes
app.get('/', (req, res) => {
  console.log('Request received at root');
  res.json({ message: 'Claims Dashboard API - Working!' });
});

app.get('/api/ping', (req, res) => {
  console.log('Ping request received');
  res.json({ ok: true, message: 'Server is working' });
});

const PORT = 3001;
const server = app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Server listening on http://127.0.0.1:${PORT}`);
  console.log(`🚀 Also try: http://localhost:${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});
