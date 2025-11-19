import { ObjectId } from 'mongodb';
import { getDb } from '../common/db.js';

const peliculaCollection = 'pelicula';

export async function handleInsertPeliculaRequest(req, res) {
  try {
    const pelicula = req.body;
    const db = getDb();
    await db.collection(peliculaCollection).insertOne(pelicula);
    res.status(201).json({ mensaje: 'Película agregada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetPeliculasRequest(req, res) {
  try {
    const db = getDb();
    const peliculas = await db.collection(peliculaCollection).find().toArray();
    res.status(200).json(peliculas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const id = ObjectId.createFromHexString(req.params.id);
    const db = getDb();
    const pelicula = await db.collection(peliculaCollection).findOne({ _id: id });
    pelicula
      ? res.status(200).json(pelicula)
      : res.status(404).json({ error: 'No encontrada' });
  } catch {
    res.status(400).json({ error: 'Id mal formado' });
  }
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const id = ObjectId.createFromHexString(req.params.id);
    const updateData = req.body;
    const db = getDb();
    await db.collection(peliculaCollection).updateOne({ _id: id }, { $set: updateData });
    res.status(200).json({ mensaje: 'Película actualizada' });
  } catch {
    res.status(400).json({ error: 'Id mal formado' });
  }
}

export async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const id = ObjectId.createFromHexString(req.params.id);
    const db = getDb();
    await db.collection(peliculaCollection).deleteOne({ _id: id });
    res.status(200).json({ mensaje: 'Película eliminada' });
  } catch {
    res.status(400).json({ error: 'Id mal formado' });
  }
}
