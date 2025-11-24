import db from "./db.js";

export async function get_all_users() {
  const response = await db.query("SELECT * FROM usuarios");
  return response.rows;
}

export async function get_user(id_usuario) {
  const response = await db.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id_usuario]);
  if (response.rowCount === 0) {
    return undefined;
  }
  return response.rows[0];
}

export async function update_user(email, nombre, apellido, telefono, direccion, id_usuario) {
  const response = await db.query(
    `UPDATE usuarios SET email = $1, nombre = $2, apellido = $3, telefono = $4, direccion = $5
       WHERE id_usuario = $6
       RETURNING id_usuario, email, nombre, apellido, telefono, direccion`,
    [email, nombre, apellido, telefono, direccion, id_usuario]
  )
  return response.rows[0];
}

export async function delete_user(id_usuario) {
  await db.query("DELETE FROM usuarios WHERE id_usuario = $1", [id_usuario]);
}

export async function create_user(email, nombre, apellido, telefono, direccion) {
  try {
    const result = await db.query(
      `INSERT INTO usuarios (email, nombre, apellido, telefono, direccion)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_usuario, email, nombre, apellido, telefono, direccion`,
      [email, nombre, apellido, telefono, direccion]
    );
    return result.rows[0];
  } catch {
    return undefined;
  }
}