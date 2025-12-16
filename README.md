# Dreamarket


Dreamarket es una aplicación web de supermercado online que permite visualizar productos por categorías, gestionar un carrito de compras y administrar pedidos de forma sencilla. Llevando registro de los productos que quiere comprar el usuario, dandole posibilidad de eliminar su pedido, modificarlo, ver su perfil, modificarlo a gusto, cerrar sesion y eliminar su cuenta.

Dreamarket cuenta con un sistema de gestion de productos desde un panel de administracion, con facil acceso desde la pagina principal.


## Entidades

*  USUARIOS --> | Id_usuario (pk) | Email | Nombre | Apellido | Telefono | Direccion | Contraseña |



*  PEDIDOS --> | Id_pedido (pk) | Id_cliente (fk) | Domicilio_entrega | Estado | Repartidor | Total | Fecha_creacion |



*  PRODUCTOS --> | Id_producto (pk) | Nombre | Marca | Precio | Categoria | Imagen | Descuento |



Aclaracion: existe una tabla intermedia para la gestion de pedidos (pedido_productos) con 5 campos: 

| Id_pedido (fk) | Id_producto (fk) | Cantidad | Precio_unitario | (Id_pedido, Id_producto) (pk) |


## Paginas

1)  Home --> Banners publicitarios, categorias de productos, banner de descuento abajo del todo (con boton hacia la pagina de descuentos).
2)  Navbar --> Logo del supermercado (izquierda del todo), boton de descuentos, botones por categoria de productos, panel de admin, carrito y ingersar/perfil.
3)  Descuentos --> Banners publicitarios, secciones con distintos tipos de descuento.
4)  Footer --> Descripcion breve del supermercado, seccion de ayuda (no funciona), seccion de pagos (tampoco funciona), seccion de contacto (tampoco) y seccion seguinos (andate moretti)
5)  Productos --> Menu de filtros a la izquierda, busqueda de productos en la parte superior, banner publicitario vertical, productos en el medio (tarjetitas con la info)
6)  Admin --> Boton de inicio a la derecha arriba del todo, tabla para la gestion de productos (con boton de creacion/eliminacion/modificacion).
7)  Carrito --> Tabla con informacion de los productos seleccionados, boton para finalizar compra y vaciar el carrito.
8)  Log in --> 2 botones, el de ingresar con cuenta ya creada (pide mail y contraseña) y el de registrarse.
9)  Sign in --> Formulario para llenar con tu info de usuario, boton de registrarme abajo.

## Como levantar y configurar el sistema

### Requisitos previos

Antes de levantar el sistema es necesario tener instalado:

*  Docker
*  Docker Compose

### Makefile

Utilizando el makefile provisto en los archivos se pueden ejecutar las siguientes sentencias de comandos:

### Ambos a la vez

```
make build     # Construye las imagenes
make start     # Levanta frontend y backend
make stop      # Detiene los contenedores
```

<img width="1400" height="778" alt="image" src="https://github.com/user-attachments/assets/2dd01e7a-f9a4-48cd-ac75-95013d574fdb" />
<img width="647" height="131" alt="image" src="https://github.com/user-attachments/assets/44fe6b58-dac4-4eaa-aaf7-52ac8dc86426" />
<img width="579" height="132" alt="image" src="https://github.com/user-attachments/assets/a6b484a0-541e-4516-8114-fbbab03b0e68" />

---

### Front y back por separado

```
make build     # Construye las imagenes
make front     # Levanta solo el frontend
make back      # Levanta solo el backend
make stop      # Detiene los contenedores
```

<img width="1400" height="778" alt="image" src="https://github.com/user-attachments/assets/1c6f69c8-036a-4557-966f-8d502e0734ad" />
<img width="1482" height="109" alt="image" src="https://github.com/user-attachments/assets/e2a61251-8463-446f-8155-bc9cc1781b42" />
<img width="1402" height="93" alt="image" src="https://github.com/user-attachments/assets/931cee48-c479-4d06-ac86-47e18533d6b4" />
<img width="579" height="132" alt="image" src="https://github.com/user-attachments/assets/fb0e8a23-c952-44a7-b196-80fbe0f13e9e" />

---

### Funcionamiento del sistema

*  El frontend se sirve mediante Nginx y permite navegar las distintas secciones del supermercado.
*  El backend expone una API REST que gestiona usuarios, productos y pedidos.
