# Dreamarket


Dreamarket es una aplicación web de supermercado online que permite visualizar productos por categorías, gestionar un carrito de compras y administrar pedidos de forma sencilla. Llevando registro de los productos que quiere comprar el usuario, dándole posibilidad de eliminar su pedido, modificarlo, ver su perfil, modificar sus datos, cerrar sesión y eliminar su cuenta.

Dreamarket cuenta con un sistema de gestión de productos desde un panel de administración, con fácil acceso desde la página principal.


## Tecnologías usadas

La página está desarrollada con frontend y backend separados, comunicados entre sí mediante una API REST. El frontend se sirve mediante Nginx y se encarga de la interfaz gráfica y de la interacción con el usuario, permitiendo navegar las distintas secciones del supermercado. Por otro lado, el backend se encarga de gestionar usuarios, productos y pedidos con la información que le envía el frontend.

La información (usuarios, productos, pedidos) se almacena en una base de datos Postgres, con un modelo relacional que incluye primary keys, foreign keys y una tabla intermedia para gestionar los pedidos y sus productos, dado que se trata de una relación many-to-many.

Todo el sistema se ejecuta dentro de contenedores Docker, utilizando Docker Compose para levantar los distintos servicios y mapear los puertos necesarios. Además, se provee un Makefile que simplifica los comandos necesarios para construir y levantar el proyecto.


## Entidades

*  USUARIOS --> | Id_usuario (PK) | Email | Nombre | Apellido | Teléfono | Dirección | Contraseña |



*  PEDIDOS --> | Id_pedido (PK) | Id_cliente (FK) | Domicilio_entrega | Estado | Repartidor | Total | Fecha_creación |



*  PRODUCTOS --> | Id_producto (PK) | Nombre | Marca | Precio | Categoría | Imagen | Descuento |

Aclaración: existe una tabla intermedia para la gestión de pedidos (pedido_productos) con 5 campos: 

| Id_pedido (FK) | Id_producto (FK) | Cantidad | Precio_unitario | (Id_pedido, Id_producto) (PK) |

<img width="1199" height="794" alt="grafico_tablas_sql" src="https://github.com/user-attachments/assets/449c8583-0285-461a-881a-6ff54c49850f" />

## Páginas

1)  Home --> Banners publicitarios, algunas categorías de productos, banner de descuento abajo del todo (con botón hacia la página de descuentos).
2)  Navbar --> Logo del supermercado (izquierda del todo), botón de descuentos, botones por categoría de productos, panel de admin, carrito e ingresar/perfil.
3)  Descuentos --> Banners publicitarios, secciones con distintos tipos de descuento.
4)  Footer --> Descripción breve del supermercado, sección de ayuda (no funciona), sección de pagos (tampoco funciona), sección de contacto (tampoco) y sección seguinos (andate moretti)
5)  Productos --> Menú de filtros a la izquierda, búsqueda de productos en la parte superior, banner publicitario vertical, productos en el medio (tarjetitas con la info)
6)  Panel de admin --> Botón de inicio a la derecha arriba del todo, tabla para la gestión de productos (con botón de creación/eliminación/edición).
7)  Carrito --> Tabla con información de los productos seleccionados, botón para finalizar compra y vaciar el carrito.
8)  Log in --> 2 botones, el de ingresar con cuenta ya creada (pide email y contraseña) y el de registrarse (pide el email).
9)  Sign in --> Formulario para llenar con tu información personal, botón para registrarse abajo.

## Cómo levantar y configurar el sistema

### Requisitos previos

Antes de levantar el sistema es necesario tener instalado:

*  Docker
*  Docker Compose

### Makefile

Utilizando el makefile provisto en los archivos se pueden ejecutar las siguientes sentencias de comandos:

### Ambos a la vez

```
make build     # Construye las imágenes
make start     # Levanta frontend y backend
make stop      # Detiene los contenedores
```

<img width="1400" height="778" alt="image" src="https://github.com/user-attachments/assets/2dd01e7a-f9a4-48cd-ac75-95013d574fdb" />
<img width="647" height="131" alt="image" src="https://github.com/user-attachments/assets/44fe6b58-dac4-4eaa-aaf7-52ac8dc86426" />
<img width="579" height="132" alt="image" src="https://github.com/user-attachments/assets/a6b484a0-541e-4516-8114-fbbab03b0e68" />

---

### Front y back por separado

```
make build     # Construye las imágenes
make front     # Levanta solo el frontend
make back      # Levanta solo el backend
make stop      # Detiene los contenedores
```

<img width="1400" height="778" alt="image" src="https://github.com/user-attachments/assets/1c6f69c8-036a-4557-966f-8d502e0734ad" />
<img width="1410" height="109" alt="image" src="https://github.com/user-attachments/assets/9967cdfb-d0c3-4260-be5d-feb4d855a0fe" />
<img width="1402" height="93" alt="image" src="https://github.com/user-attachments/assets/931cee48-c479-4d06-ac86-47e18533d6b4" />
<img width="579" height="132" alt="image" src="https://github.com/user-attachments/assets/fb0e8a23-c952-44a7-b196-80fbe0f13e9e" />


---

