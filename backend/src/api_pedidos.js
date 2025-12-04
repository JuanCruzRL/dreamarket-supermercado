import express from "express";
import { get_all_orders, get_order, create_order, update_order, delete_order} from "./db/pedidos.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const pedidos = await get_all_orders();
  res.status(200).json(pedidos);
});

router.post("/", async (req, res) => {
    const { id_cliente, domicilio_entrega, estado, repartidor, productos } = req.body;

    if (!id_cliente || !domicilio_entrega || !estado || !productos) {
        return res.status(400).send("Faltan campos obligatorios");
    }

    if (productos.length === 0) {
        return res.sendstatus(400);
    }

    const pedido = await create_order(
        id_cliente,
        domicilio_entrega,
        estado,
        repartidor,
        productos
    );

    res.status(201).json(pedido);
});

router.get("/:id", async (req, res) => {
  const id_buscado = req.params.id;

  const pedido = await get_order(id_buscado);

  if (!pedido) {
    return res.status(404).send("Pedido no encontrado");
  }

  res.status(200).json(pedido);
});

router.put("/:id", async (req, res) => {
  const id_buscado = req.params.id;
  const { estado, repartidor } = req.body;

  if (!estado) {
    return res.status(400).send("El estado es obligatorio");
  }

  const pedido = await update_order(id_buscado, estado, repartidor);

  if (!pedido) {
    return res.status(404).send("Pedido no encontrado");
  }

  res.status(200).json(pedido);
});

router.delete("/:id", async (req, res) => {
  const id_buscado = req.params.id;
  const pedido = await get_order(id_buscado);

  if (!pedido) {
    return res.status(404).send("Pedido no encontrado");
  }

  await delete_order(id_buscado);
  res.status(200).json(pedido);
});

export default router;
