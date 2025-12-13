async function cargarNavbar() {
    const respuesta = await fetch("./navbar.html");
    const html = await respuesta.text();
    document.getElementById("navbar-placeholder").innerHTML = html;

    botonUsuario = document.getElementById("btn-usuario");
    usuariologueado = localStorage.getItem("usuario_actual");

    if (usuariologueado) {
        botonUsuario.textContent = "Perfil 👤";
        botonUsuario.removeAttribute("href");
        botonUsuario.onclick = function () {
            abrir_perfil();
        };
    } else {
        botonUsuario.textContent = "Ingresar 👤";
        botonUsuario.href = "./ingresar.html";
        botonUsuario.onclick = null;
    }
}
cargarNavbar();
const baseApiUrl = "http://localhost:3000/usuarios";

modalPerfil = document.getElementById("modal-perfil");
modalBackground = modalPerfil.querySelector(".modal-background");
botonCerrarModal = document.getElementById("btn-cerrar-modal");

inputEmail = document.getElementById("perfil-email");
inputNombre = document.getElementById("perfil-nombre");
inputApellido = document.getElementById("perfil-apellido");
inputTelefono = document.getElementById("perfil-telefono");
inputDireccion = document.getElementById("perfil-direccion");
inputContrasenia = document.getElementById("perfil-contrasenia");

botonModificarPerfil = document.getElementById("btn-modificar-perfil");
botonEliminarCuenta = document.getElementById("btn-eliminar-cuenta");

contraseniaActual = "";

async function abrir_perfil() {
    usuarioJSON = localStorage.getItem("usuario_actual");

    usuario = JSON.parse(usuarioJSON);
    id = usuario.id_usuario;

    response = await fetch(baseApiUrl + "/" + id);
    if (response.status !== 200) {
        alert("No se pudo cargar la información del perfil.");
        return;
    }

    usuario = await response.json();

    inputEmail.value = usuario.email;
    inputNombre.value = usuario.nombre;
    inputApellido.value = usuario.apellido;
    inputTelefono.value = usuario.telefono;
    inputDireccion.value = usuario.direccion;
    inputContrasenia.value = "";
    contraseniaActual = usuario.contrasenia || "";

    modalPerfil.classList.add("is-active");
}

function cerrar_perfil() {
    modalPerfil.classList.remove("is-active");
}

modalBackground.onclick = cerrar_perfil;
botonCerrarModal.onclick = cerrar_perfil;

async function modificar_usuario() {
    usuarioJSON = localStorage.getItem("usuario_actual");

    usuario = JSON.parse(usuarioJSON);
    id = usuario.id_usuario;

    email = inputEmail.value.trim();
    nombre = inputNombre.value.trim();
    apellido = inputApellido.value.trim();
    telefono = inputTelefono.value.trim();
    direccion = inputDireccion.value.trim();
    contraseniaNueva = inputContrasenia.value.trim();

    if (!nombre || !apellido || !telefono || !direccion) {
        alert("Completá nombre, apellido, teléfono y dirección.");
        return;
    }
    if (contraseniaNueva === "") {
        contraseniaFinal = contraseniaActual;
    } else {
        contraseniaFinal = contraseniaNueva;
    }
    response = await fetch(baseApiUrl + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            direccion: direccion,
            contrasenia: contraseniaFinal
        })
    });

    if (response.status === 200) {
        usuarioActualizado = await response.json();
        localStorage.setItem("usuario_actual", JSON.stringify(usuarioActualizado));
        contraseniaActual = contraseniaFinal;

        alert("Perfil actualizado correctamente.");
        inputContrasenia.value = "";
        cerrar_perfil();
    } else if (response.status === 404) {
        alert("El usuario ya no existe.");
    } else {
        texto = await response.text();
        console.log("Error al actualizar perfil:", response.status, texto);
        alert("No se pudo actualizar el perfil.");
    }
}

async function eliminar_cuenta() {
    usuarioJSON = localStorage.getItem("usuario_actual");

    usuario = JSON.parse(usuarioJSON);
    id = usuario.id_usuario;

    confirmar = confirm("¿Seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (!confirmar) {
        return;
    }

    response = await fetch(baseApiUrl + "/" + id, {
        method: "DELETE"
    });
    localStorage.removeItem("usuario_actual");
    alert("Cuenta eliminada correctamente.");
    cerrar_perfil();
    window.location.reload();
};

async function cerrar_sesion() {
    localStorage.removeItem("usuario_actual");
    cerrar_perfil();
    window.location.reload();
}

pedidoEditandoId = null;
productosEditando = [];

async function abrir_modal_pedidos() {
  usuario = JSON.parse(localStorage.getItem("usuario_actual"));

  response = await fetch("http://localhost:3000/pedidos");
  pedidos = await response.json();

  pedidosUsuario = pedidos.filter(p => p.id_cliente === usuario.id_usuario);

  cuerpo = document.getElementById("tabla-pedidos");
  cuerpo.innerHTML = "";

  pedidosUsuario.forEach(p => {
    cuerpo.innerHTML += `
      <tr>
        <td>${p.id_pedido}</td>
        <td>${new Date(p.fecha_creacion).toLocaleDateString()}</td>
        <td>$${p.total}</td>
        <td>${p.estado}</td>
        <td>
          <button class="button is-small is-warning"
            onclick="editar_pedido(${p.id_pedido})">
            Modificar
          </button>
          <button class="button is-small is-danger"
            onclick="eliminar_pedido(${p.id_pedido})">
            Eliminar
          </button>
        </td>
      </tr>
    `;
  });

  document.getElementById("modal-pedidos").classList.add("is-active");
}

function cerrar_modal_pedidos() {
  document.getElementById("modal-pedidos").classList.remove("is-active");
}

async function eliminar_pedido(idPedido) {
  confirmar = confirm("¿Eliminar este pedido?");
  if (!confirmar) {
    return;
  }
  
  await fetch(`http://localhost:3000/pedidos/${idPedido}`, {
    method: "DELETE"
  });

  abrir_modal_pedidos();
}

async function editar_pedido(idPedido) {
  response = await fetch(`http://localhost:3000/pedidos/${idPedido}`);
  pedido = await response.json();

  pedidoEditandoId = idPedido;
  productosEditando = pedido.productos;

  contenedor = document.getElementById("contenedor-productos-pedido");
  contenedor.innerHTML = "";

  productosEditando.forEach((p, index) => {
    contenedor.innerHTML += `
      <div class="field is-grouped">
        <div class="control">
          <input class="input" value="${p.nombre}" disabled>
        </div>
        <div class="control">
          <input class="input" type="number" min="1"
            value="${p.cantidad}"
            onchange="productosEditando[${index}].cantidad = Number(this.value)">
        </div>
      </div>
    `;
  });

  document.getElementById("modal-editar-pedido").classList.add("is-active");
}

async function guardar_cambios_pedido() {
  await fetch(`http://localhost:3000/pedidos/${pedidoEditandoId}/productos`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      productos: productosEditando.map(p => ({
        id_producto: p.id_producto,
        cantidad: p.cantidad
      }))
    })
  });

  alert("Pedido actualizado");

  cerrar_modal_editar();
  abrir_modal_pedidos();
}

function cerrar_modal_editar() {
  document.getElementById("modal-editar-pedido").classList.remove("is-active");
}