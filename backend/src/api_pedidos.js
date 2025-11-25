import express from "express";
import { get_all_orders, get_order, create_order, update_order, delete_order } from "./db/pedidos.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const pedidos = await get_all_orders();
    return res.status(200).json(pedidos);
});

router.post("/", async (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send("No body was provided");
    }
    const id_cliente = req.body.id_cliente;
    const id_producto = req.body.id_producto;
    const cantidad = req.body.cantidad;
    const estado = req.body.estado;
    const repartidor = req.body.repartidor;

    if (id_cliente === undefined) {
        return res.sendStatus(400)
    }
    if (id_producto === undefined) {
        return res.sendStatus(400)
    }
    if (cantidad === undefined) {
        return res.sendStatus(400)
    }
    if (estado === undefined) {
        return res.sendStatus(400)
    }
    if (repartidor === undefined) {
        return res.sendStatus(400)
    }
    const pedido = await create_order(id_cliente, id_producto, cantidad, estado, repartidor);
    return res.status(201).json(pedido);
});

router.get("/:id", async (req, res) => {
    const id_buscado = req.params.id;
    const pedido = await get_order(id_buscado);
    if (pedido === undefined) {
        return res.sendStatus(404);
    }

    return res.status(200).json(pedido);
});

router.put("/:id", async (req, res) => {
    const id_buscado = req.params.id;
    const id_cliente = req.body.id_cliente;
    const id_producto = req.body.id_producto;
    const cantidad = req.body.cantidad;
    const estado = req.body.estado;
    const repartidor = req.body.repartidor;

    if (id_cliente === undefined) {
        return res.sendStatus(400)
    }
    if (id_producto === undefined) {
        return res.sendStatus(400)
    }
    if (cantidad === undefined) {
        return res.sendStatus(400)
    }
    if (estado === undefined) {
        return res.sendStatus(400)
    }
    if (repartidor === undefined) {
        return res.sendStatus(400)
    }

    const pedido = await update_order(id_buscado, cantidad, estado, repartidor);

    if (!pedido) {
        return res.status(404).send("Order not found");
    }

    return res.status(200).json(pedido);
});

router.delete("/:id", async (req, res) => {
    const id_buscado = req.params.id;
    const pedido = await get_order(id_buscado);

    if (pedido === undefined) {
        return res.sendStatus(404);
    }

    await delete_order(id_buscado);
    return res.status(200).json(pedido);
});

export default router;
