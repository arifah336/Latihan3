const express = require('express');
const app = express();
const PORT = 8001;

// Token rahasia (hardcode, bisa juga dari .env)
const TOKEN = "mysecrettoken";

// Middleware sederhana untuk cek Bearer Token
function authBearer(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token tidak ditemukan' });
  }

  if (token !== TOKEN) {
    return res.status(403).json({ error: 'Token salah atau tidak valid' });
  }

  next();
}

app.get('/api/payments', authBearer, (req, res) => {
  res.json([
    { id: 101, user: 'Andi', amount: 150000, status: 'Success', method: 'Bank Transfer' },
    { id: 102, user: 'Budi', amount: 250000, status: 'Pending', method: 'Credit Card' },
    { id: 103, user: 'Cici', amount: 50000, status: 'Failed', method: 'E-Wallet' }
  ]);
});

app.listen(PORT, () => {
  console.log(`server berjalan di http://localhost:${PORT}`);
});
