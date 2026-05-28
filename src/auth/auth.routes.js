const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const SECRET = 'mi_clave_secreta';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Usuario de prueba (puedes cambiarlo)
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

    return res.json({ token });
  }

  res.status(401).json({ message: 'Credenciales incorrectas' });
});

module.exports = { router, SECRET };