const verifyToken = require('./middlewares/auth');
const express = require('express');
const app = express();
const { sequelize } = require('./modules/pelicula.model');

const peliculasRoutes = require('./routes/peliculas.routes');
const logger = require('./middlewares/logger');
const apiKey = require('./middlewares/apikey');

const authRoutes = require('./auth/auth.routes').router;

app.use(express.json());
app.use(logger);
app.use(apiKey);

app.use('/auth', authRoutes);
app.use('/peliculas', verifyToken, peliculasRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Base de datos lista');
  
  app.listen(PORT, () => {
    console.log('Servidor en puerto $ {PORT}');
  });
});