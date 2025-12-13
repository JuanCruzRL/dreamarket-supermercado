import { pool } from "./db.js";

export async function get_all_users() {
  const response = await pool.query(
    "SELECT * FROM usuarios"
  );
  return response.rows;
}

export async function get_user(id_usuario) {
  const response = await pool.query(
    "SELECT * FROM usuarios WHERE id_usuario = $1",
    [id_usuario]
  );
  if (response.rowCount === 0) {
    return undefined;
  }
  return response.rows[0];
}

export async function update_user(email, nombre, apellido, telefono, direccion, contrasenia, id_usuario) {
  const response = await pool.query(
    `UPDATE usuarios
        SET email       = $1,
            nombre      = $2,
            apellido    = $3,
            telefono    = $4,
            direccion   = $5,
            contrasenia = $6
      WHERE id_usuario  = $7
      RETURNING id_usuario, email, nombre, apellido, telefono, direccion`,
    [email, nombre, apellido, telefono, direccion, contrasenia, id_usuario]
  );
  return response.rows[0];
}

export async function delete_user(id_usuario) {
  await pool.query("DELETE FROM usuarios WHERE id_usuario = $1", [id_usuario]);
}

export async function create_user(email, nombre, apellido, telefono, direccion, contrasenia) {
  try {
    const result = await pool.query(
      `INSERT INTO usuarios (email, nombre, apellido, telefono, direccion, contrasenia)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id_usuario, email, nombre, apellido, telefono, direccion`,
      [email, nombre, apellido, telefono, direccion, contrasenia]
    );
    return result.rows[0];
  } catch {
    return undefined;
  }
}


export async function get_user_by_email(email) {
  const response = await pool.query(
    "SELECT * FROM usuarios WHERE email = $1",
    [email]
  );
  if (response.rowCount === 0) {
    return undefined;
  }
  return response.rows[0];
}
