import express from "express";

const router = express.Router();

let usuarios = [];

router.get("/", (req, res) => {
  res.json(usuarios);
});

router.post("/", (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;

  const ultimo_usuario = usuarios[usuarios.length - 1];
  let id_usuario = 1;
  if (ultimo_usuario !== undefined) {
    id_usuario = ultimo_usuario.id_usuario + 1;
  }

  const usuario = {
    id_usuario: id_usuario,
    email: email,
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    direccion: direccion
  };

  usuarios.push(usuario);

  res.status(201).json(usuario);
});

router.get("/:id", (req, res) => {
  const id_buscado = req.params.id;
  const usuario = usuarios.find((item) => {
    return item.id_usuario == id_buscado;
  });

  if (usuario === undefined) {
    return res.status(404).send("");
  }

  res.json(usuario);
});

router.put("/:id", (req, res) => {
  const id_buscado = req.params.id;

  const email = req.body.email;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;

  let indice_usuario = undefined;

  for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].id_usuario == id_buscado) {
      indice_usuario = i;
      usuarios[i].email = email;
      usuarios[i].nombre = nombre;
      usuarios[i].apellido = apellido;
      usuarios[i].telefono = telefono;
      usuarios[i].direccion = direccion;
    }
  }

  if (indice_usuario === undefined) {
    return res.status(404).send("");
  }

  res.json(usuarios[indice_usuario]);
});

router.delete("/:id", (req, res) => {
  const id_buscado = req.params.id;

  const usuario = usuarios.find((item) => {
    return item.id_usuario == id_buscado;
  });

  usuarios = usuarios.filter((item) => {
    return item.id_usuario != id_buscado;
  });

  if (usuario === undefined) {
    return res.status(404).send("");
  }

  res.json(usuario);
});

export default router;
