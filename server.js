import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Bienvenido al cine Iplacex');
});

app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al conectar con MongoDB:', error.message);
  });
