const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Inicializar DB SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao abrir banco:', err.message);
  } else {
    console.log('Conectado ao banco SQLite.');
  }
});

// Criar tabela users
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);
});

// Rotas

// Get all users
app.get('/users', (req, res) => {
  db.all('SELECT id, name, email FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Register user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: 'Dados incompletos' });
    return;
  }
  const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
  stmt.run(name, email, password, function(err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        res.status(400).json({ error: 'Email já cadastrado' });
      } else {
        res.status(500).json({ error: err.message });
      }
    } else {
      res.json({ id: this.lastID, name, email });
    }
  });
  stmt.finalize();
});

// Login user
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT id, name, email FROM users WHERE email = ? AND password = ?', [email, password], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (row) {
      res.json(row);
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
