import express from "express";
import { get_all_users, create_user, get_user, delete_user, update_user } from "./db/usuarios.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const usuarios = await get_all_users();
  res.json(usuarios);
});

router.post("/", async (req, res) => {
  if (req.body === undefined){
    return res.status(400).send("No body was provided");
  }

  const id_buscado = req.body.id_usuario
  const email = req.body.email;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;

  if (await get_user(id_buscado) !== undefined){
    res.sendStatus(400)
  }
  if (email === undefined){
    res.sendStatus(400)
  }
  if (nombre === undefined){
    res.sendStatus(400)
  }
  if (apellido === undefined){
    res.sendStatus(400)
  }
  if (telefono === undefined){
    res.sendStatus(400)
  }
  if (direccion === undefined){
    res.sendStatus(400)
  }
  const usuario = await create_user(email, nombre, apellido, telefono, direccion);  
  res.status(201).json(usuario);
});

router.get("/:id", async (req, res) => {
  const id_buscado = req.params.id;
  const usuario = await get_user(id_buscado);
  if (usuario === undefined) {
    return res.status(404).send("");
  }

  res.json(usuario);
});

router.put("/:id", async (req, res) => {
  const id_buscado = req.params.id;
  const email = req.body.email;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;

  let usuario = await get_user(id_buscado);
  if (usuario === undefined){
    return res.status(404).send("User not found");
  }
  if (email === undefined){
    res.sendStatus(400)
  }
  if (nombre === undefined){
    res.sendStatus(400)
  }
  if (apellido === undefined){
    res.sendStatus(400)
  }
  if (telefono === undefined){
    res.sendStatus(400)
  }
  if (direccion === undefined){
    res.sendStatus(400)
  }
  usuario = await update_user(email, nombre, apellido, telefono, direccion, id_buscado);
  res.json(usuario);
});

router.delete("/:id", async (req, res) => {
  const id_buscado = req.params.id;
  const usuario = await get_user(id_buscado);

  if (usuario === undefined) {
    return res.status(404).send("");
  }
  await delete_user(id_buscado);
  res.json(usuario);
});

export default router;
