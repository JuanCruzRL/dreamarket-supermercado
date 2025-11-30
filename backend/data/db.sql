CREATE TABLE usuarios (
  id_usuario  SERIAL PRIMARY KEY,
  email       VARCHAR(255) NOT NULL UNIQUE,
  nombre      VARCHAR(100) NOT NULL,
  apellido    VARCHAR(100) NOT NULL,
  telefono    VARCHAR(50),
  direccion   VARCHAR(255)
);

CREATE TABLE productos (
  id_producto  SERIAL PRIMARY KEY,
  nombre       VARCHAR(255) NOT NULL,
  marca        VARCHAR(100),
  precio       NUMERIC(10,2) NOT NULL,
  stock        INT NOT NULL,
  categoria    VARCHAR(100),
  imagen       TEXT,
  descuento    VARCHAR(50)
);

CREATE TABLE pedidos (
  id_pedido       SERIAL PRIMARY KEY,
  id_cliente      INT REFERENCES usuarios(id_usuario),
  id_producto     INT REFERENCES productos(id_producto),
  cantidad        INT NOT NULL,
  estado          VARCHAR(50) NOT NULL,
  repartidor      VARCHAR(100),
  fecha_creacion  TIMESTAMP DEFAULT NOW()
);