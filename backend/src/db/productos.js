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

export async function create_product(nombre, marca, precio, stock, categoria, imagen, descuento) {
  try {
    const result = await db.query(
      `INSERT INTO productos (nombre, marca, precio, stock, categoria, imagen, descuento)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id_producto, nombre, marca, precio, stock, categoria, imagen, descuento`,
      [nombre, marca, precio, stock, categoria, imagen, descuento]
    );
    return result.rows[0];
  } catch {
    return undefined;
  }
}

export async function update_product(id_producto, nombre, marca, precio, stock, categoria, imagen, descuento) {
    const response = await db.query(
        `UPDATE productos SET  nombre = $2, marca = $3, precio = $4, stock = $5, categoria = $6, imagen = $7, descuento = $8
        WHERE id_producto = $1
        RETURNING id_producto, nombre, marca, precio, stock, categoria, imagen, descuento`,
        [id_producto, nombre, marca, precio, stock, categoria, imagen, descuento]
    )
    return response.rows[0];
}

export async function delete_product(id_producto) {
    await db.query("DELETE FROM productos WHERE id_producto = $1", [id_producto]);
}