import { ObjectId } from 'mongodb';
import { getDb } from '../common/db.js';

const actorCollection = 'actor';
const peliculaCollection = 'pelicula';

export async function handleInsertActorRequest(req, res) {
  try {
    const actor = req.body;
    const db = getDb();
    const objectId = ObjectId.createFromHexString(actor.idPelicula);
    const pelicula = await db.collection(peliculaCollection).findOne({ _id: objectId });

    if (!pelicula) return res.status(404).json({ error: 'Película no existe' });

    actor.idPelicula = pelicula._id.toString();
    await db.collection(actorCollection).insertOne(actor);
    res.status(201).json({ mensaje: 'Actor agregado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleGetActoresRequest(req, res) {
  try {
    const db = getDb();

    const actores = await db.collection(actorCollection).find().toArray();

    const actoresConPeliculas = await Promise.all(
      actores.map(async (actor) => {
        const pelicula = await db.collection(peliculaCollection)
          .findOne({ _id: actor.idPelicula });

        return {
          _id: actor._id,
          idPelicula: actor.idPelicula.toString(),
          "nombre Pelicula": pelicula ? pelicula.nombre : "No disponible",
          nombre: actor.nombre,
          edad: actor.edad,
          estadoRetirado: actor.estadoRetirado,
          premios: actor.premios
        };
      })
    );

    res.status(200).json(actoresConPeliculas);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function handleGetActorByIdRequest(req, res) {
  try {
    const id = ObjectId.createFromHexString(req.params.id);
    const db = getDb();

    const actor = await db.collection(actorCollection).findOne({ _id: id });
    if (!actor) return res.status(404).json({ error: 'No encontrado' });

    const pelicula = await db.collection(peliculaCollection)
      .findOne({ _id: actor.idPelicula });

    const respuesta = {
      _id: actor._id,
      idPelicula: actor.idPelicula.toString(),
      "nombre Pelicula": pelicula ? pelicula.nombre : "No disponible",
      nombre: actor.nombre,
      edad: actor.edad,
      estadoRetirado: actor.estadoRetirado,
      premios: actor.premios
    };

    res.status(200).json(respuesta);

  } catch (err) {
    res.status(400).json({ error: "Id mal formado" });
  }
}


export async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const db = getDb();

    const peliculaId = ObjectId.createFromHexString(req.params.id);

    const pelicula = await db.collection(peliculaCollection)
      .findOne({ _id: peliculaId });

    if (!pelicula) {
      return res.status(404).json({ error: "Película no existe" });
    }

    const actores = await db.collection(actorCollection)
      .find({ idPelicula: peliculaId })
      .toArray();

    const actoresConNombrePelicula = actores.map(actor => ({
      _id: actor._id,
      idPelicula: actor.idPelicula.toString(),
      "nombre Pelicula": pelicula.nombre,
      nombre: actor.nombre,
      edad: actor.edad,
      estadoRetirado: actor.estadoRetirado,
      premios: actor.premios
    }));

    res.status(200).json(actoresConNombrePelicula);

  } catch (err) {
    res.status(400).json({ error: "Id mal formado" });
  }
}

