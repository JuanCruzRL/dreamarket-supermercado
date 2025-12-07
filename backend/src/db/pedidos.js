import { pool } from "./db.js";

export async function get_all_orders() {
  const response = await db.query("SELECT * FROM pedidos ORDER BY fecha_creacion DESC");
  return response.rows;
}

export async function get_order(id_pedido) {
  const pedido = await db.query("SELECT * FROM pedidos WHERE id_pedido = $1", [id_pedido]);

  if (pedido.rowCount === 0){
    return undefined;
  }

  const productos = await db.query(
    `SELECT pp.id_producto, producto.nombre, pp.cantidad, pp.precio_unitario
     FROM pedido_productos pp
     JOIN productos producto ON producto.id_producto = pp.id_producto
     WHERE pp.id_pedido = $1`,
    [id_pedido]
  );

  return {
    id_pedido: pedido.rows[0].id_pedido,
    id_cliente: pedido.rows[0].id_cliente,
    domicilio_entrega: pedido.rows[0].domicilio_entrega,
    estado: pedido.rows[0].estado,
    repartidor: pedido.rows[0].repartidor,
    total: pedido.rows[0].total,
    fecha_creacion: pedido.rows[0].fecha_creacion,
    productos: productos.rows
  };
}

export async function create_order(id_cliente, domicilio_entrega, estado, repartidor, productos) {
  const pedido = await db.query(
    `INSERT INTO pedidos (id_cliente, domicilio_entrega, estado, repartidor, total)
     VALUES ($1, $2, $3, $4, 0)
     RETURNING id_pedido`,
    [id_cliente, domicilio_entrega, estado, repartidor]
  );

  const id_pedido = pedido.rows[0].id_pedido;

  let total = 0;
  for (const producto of productos) {
    const prod = await db.query("SELECT precio FROM productos WHERE id_producto = $1", [producto.id_producto]);

    const precio_unitario = prod.rows[0].precio;
    const subtotal = precio_unitario * producto.cantidad;
    total += subtotal;

    await db.query(
      `INSERT INTO pedido_productos 
       (id_pedido, id_producto, cantidad, precio_unitario)
       VALUES ($1, $2, $3, $4)`,
      [id_pedido, producto.id_producto, producto.cantidad, precio_unitario]
    );
  }

  await db.query(
    `UPDATE pedidos SET total = $1 WHERE id_pedido = $2`,
    [total, id_pedido]
  );

  return { id_pedido, total };
}

export async function update_order(id_pedido, estado, repartidor) {
  const response = await db.query(
    `UPDATE pedidos
     SET estado = $2, repartidor = $3
     WHERE id_pedido = $1
     RETURNING *`,
    [id_pedido, estado, repartidor]
  );

  return response.rows[0];
}

export async function delete_order(id_pedido) {
  await db.query("DELETE FROM pedido_productos WHERE id_pedido = $1", [id_pedido]);

  await db.query("DELETE FROM pedidos WHERE id_pedido = $1", [id_pedido]);
}