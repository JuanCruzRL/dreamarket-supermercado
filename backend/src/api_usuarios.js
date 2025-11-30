import express from "express";
import { get_all_users, create_user, get_user, delete_user, update_user, get_user_by_email,} from "./db/usuarios.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const usuarios = await get_all_users();
  return res.status(200).json(usuarios);
});

router.post("/", async (req, res) => {
  if (req.body === undefined){
    return res.status(400).send("No body was provided");
  }

  const email = req.body.email;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;

  if (email === undefined){
    return res.sendStatus(400)
  }
  if (nombre === undefined){
    return res.sendStatus(400)
  }
  if (apellido === undefined){
    return res.sendStatus(400)
  }
  if (telefono === undefined){
    return res.sendStatus(400)
  }
  if (direccion === undefined){
    return res.sendStatus(400)
  }
  const usuario = await create_user(email, nombre, apellido, telefono, direccion);  
  return res.status(201).json(usuario);
});

router.post("/login", async (req, res) => {
  if (req.body === undefined) {
    return res.status(400).send("No body was provided");
  }

  const email = req.body.email;

  if (email === undefined) {
    return res.sendStatus(400);
  }

  const usuario = await get_user_by_email(email);

  if (usuario === undefined) {
    return res.sendStatus(401);
  }

  return res.status(200).json(usuario);
});

router.get("/:id", async (req, res) => {
  const id_buscado = req.params.id;
  const usuario = await get_user(id_buscado);
  if (usuario === undefined) {
    return res.sendStatus(404);
  }

  return res.status(200).json(usuario);
});

router.put("/:id", async (req, res) => {
  const id_buscado = req.params.id;
  const email = req.body.email;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;

  if (email === undefined){
    return res.sendStatus(400)
  }
  if (nombre === undefined){
    return res.sendStatus(400)
  }
  if (apellido === undefined){
    return res.sendStatus(400)
  }
  if (telefono === undefined){
    return res.sendStatus(400)
  }
  if (direccion === undefined){
    return res.sendStatus(400)
  }

  const usuario = await update_user(email, nombre, apellido, telefono, direccion, id_buscado);

  if (!usuario){
    return res.status(404).send("User not found");
  }

  return res.status(200).json(usuario);
});

router.delete("/:id", async (req, res) => {
  const id_buscado = req.params.id;
  const usuario = await get_user(id_buscado);

  if (usuario === undefined) {
    return res.sendStatus(404);
  }
  
  await delete_user(id_buscado);
  return res.status(200).json(usuario);
});

export default router;
