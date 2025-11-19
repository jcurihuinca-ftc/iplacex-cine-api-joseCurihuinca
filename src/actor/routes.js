import express from 'express';
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleGetActoresByPeliculaIdRequest,
  handleDeleteActorByIdRequest,
  handleDeleteAllActoresRequest
} from './controller.js';

const actorRoutes = express.Router();

actorRoutes.post('/actor', handleInsertActorRequest);
actorRoutes.get('/actores', handleGetActoresRequest);
actorRoutes.get('/actor/:id', handleGetActorByIdRequest);
actorRoutes.get('/actor/pelicula/:id', handleGetActoresByPeliculaIdRequest);
actorRoutes.delete('/api/actor/:id', handleDeleteActorByIdRequest);
actorRoutes.delete('/api/actores', handleDeleteAllActoresRequest);

export default actorRoutes;
