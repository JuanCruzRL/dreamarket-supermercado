import express from "express";
import { get_all_products, create_product, get_product, delete_product, update_product } from "./db/productos.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let productos = await get_all_products();

  const { categoria, descuento, nombre } = req.query;

  if (categoria) {
    productos = productos.filter(
      producto => producto.categoria?.toLowerCase() === categoria.toLowerCase()
    );
  }

  if (descuento) {
    productos = productos.filter(
      producto => (producto.descuento || "").toLowerCase() === descuento.toLowerCase()
    );
  }

  if (nombre) {
    const texto = nombre.toLowerCase();
    productos = productos.filter(
      producto => producto.nombre.toLowerCase().includes(texto)
    );
  }

  return res.status(200).json(productos);
});


router.post("/", async (req, res) => {
    if (req.body === undefined) {
        return res.status(400).send("No body was provided");
    }
    const nombre = req.body.nombre;
    const marca = req.body.marca;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const categoria = req.body.categoria;
    const imagen = req.body.imagen;
    const descuento = req.body.descuento;

    if (nombre === undefined) {
        return res.sendStatus(400)
    }
    if (marca === undefined) {
        return res.sendStatus(400)
    }
    if (precio === undefined) {
        return res.sendStatus(400)
    }
    if (stock === undefined) {
        return res.sendStatus(400)
    }
    if (categoria === undefined) {
        return res.sendStatus(400)
    }
    const producto = await create_product(nombre, marca, precio, stock, categoria, imagen, descuento);
    return res.status(201).json(producto);
});

router.get("/:id", async (req, res) => {
    const id_buscado = req.params.id;
    const producto = await get_product(id_buscado);
    if (producto === undefined) {
        return res.sendStatus(404);
    }

    return res.status(200).json(producto);
});

router.put("/:id", async (req, res) => {
    const id_buscado = req.params.id;
    const nombre = req.body.nombre;
    const marca = req.body.marca;
    const precio = req.body.precio;
    const stock = req.body.stock;
    const categoria = req.body.categoria;
    const imagen = req.body.imagen;
    const descuento = req.body.descuento;

    if (nombre === undefined) {
        return res.sendStatus(400)
    }
    if (marca === undefined) {
        return res.sendStatus(400)
    }
    if (precio === undefined) {
        return res.sendStatus(400)
    }
    if (stock === undefined) {
        return res.sendStatus(400)
    }
    if (categoria === undefined) {
        return res.sendStatus(400)
    }

    const producto = await update_product(id_buscado, nombre, marca, precio, stock, categoria, imagen, descuento);

    if (!producto) {
        return res.status(404).send("Product not found");
    }

    return res.status(200).json(producto);
});

router.delete("/:id", async (req, res) => {
    const id_buscado = req.params.id;
    const producto = await get_product(id_buscado);

    if (producto === undefined) {
        return res.sendStatus(404);
    }

    await delete_product(id_buscado);
    return res.status(200).json(producto);
});

export default router;
