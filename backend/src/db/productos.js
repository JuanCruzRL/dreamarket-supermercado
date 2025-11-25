import db from "./db.js";

export async function get_all_products() {
    const response = await db.query("SELECT * FROM productos");
    return response.rows;
}

export async function get_product(id_producto) {
    const response = await db.query("SELECT * FROM productos WHERE id_producto = $1", [id_producto]);
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}

export async function create_product(nombre, marca, precio, stock, categoria) {
  try {
    const result = await db.query(
      `INSERT INTO productos (nombre, marca, precio, stock, categoria)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_producto, nombre, marca, precio, stock, categoria`,
      [nombre, marca, precio, stock, categoria]
    );
    return result.rows[0];
  } catch {
    return undefined;
  }
}

export async function update_product(id_producto, nombre, marca, precio, stock, categoria) {
    const response = await db.query(
        `UPDATE productos SET  nombre = $2, marca = $3, precio = $4, stock = $5, categoria = $6
        WHERE id_producto = $1
        RETURNING id_producto, nombre, marca, precio, stock, categoria`,
        [id_producto, nombre, marca, precio, stock, categoria]
    )
    return response.rows[0];
}

export async function delete_product(id_producto) {
    await db.query("DELETE FROM productos WHERE id_producto = $1", [id_producto]);
}