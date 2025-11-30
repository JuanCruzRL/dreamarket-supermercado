import db from "./db.js";

export async function get_all_orders() {
    const response = await db.query("SELECT * FROM pedidos");
    return response.rows;
}

export async function get_order(id_pedido) {
    const response = await db.query("SELECT * FROM pedidos WHERE id_pedido = $1", [id_pedido]);
    if (response.rowCount === 0) {
        return undefined;
    }
    return response.rows[0];
}

export async function create_order(id_cliente, id_producto, cantidad, estado, repartidor) {
  try {
    const response = await db.query(
      `INSERT INTO pedidos (id_cliente, id_producto, cantidad, estado, repartidor)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id_pedido, id_cliente, id_producto, cantidad, estado, repartidor, fecha_creacion`,
      [id_cliente, id_producto, cantidad, estado, repartidor]
    );
    return response.rows[0];
  } catch {
    return undefined;
  }
}

export async function update_order(id_pedido, cantidad, estado, repartidor) {
    const response = await db.query(
        `UPDATE pedidos SET  cantidad = $2, estado = $3, repartidor = $4
        WHERE id_pedido = $1
        RETURNING id_pedido, id_cliente, id_producto, cantidad, estado, repartidor, fecha_creacion`,
        [id_pedido, cantidad, estado, repartidor]
    )
    return response.rows[0];
}

export async function delete_order(id_pedido) {
    await db.query("DELETE FROM pedidos WHERE id_pedido = $1", [id_pedido]);
}