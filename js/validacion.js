window.onload = function () {
  //event listeners
  submit.addEventListener("click", validarFormulario); //validacion del formulario completo

  // pruebas.addEventListener('click', miFuncion);

  //validacion inmediata del telefono
  telefono.addEventListener('keyup', validarTlf);

  //validacion inmediata de la direccion

  // validacion inmediata del minimo de ingredientes
  const ingredientesChkboxes = document.querySelectorAll(
    '#opciones-pizza input[type="checkbox"]'
  );
  ingredientesChkboxes.forEach((chkbox) =>
    chkbox.addEventListener("click", validarMinIngredientes)
  );

  //validacion inmediata de los terminos y condiciones
  const terminos = document.getElementById("terminos");
  terminos.addEventListener("click", validarTerminos);
};

/*
 *============= Validacion formulario =============
 */
function validarFormulario(event) {
  let valido = true;
  // validarCamposTexto();
  if (!validarTlf(event)) valido = false;
  if (!validarMinIngredientes()) valido = false;
  // validarEmail();

  if (!validarTerminos()) valido = false;

  if (!valido) {
    alert("Parece que hay errores en el formulario");
    event.preventDefault();
  }
}

/*
 *============= Validacion telefono =============
 */

/**
 * Funcion que verifica que el telefono tiene el formato de un movil espaniol
 * @returns true si el numero de telefono es valido, false si no
 */
 function validarTlf(event) {
  const mensajeError = telefono.nextElementSibling;

  let inputUsuario = telefono.value.split(" ").join(""); //elimina todos los espacios del input
  const patternString = "^\\+346[0-9]{1,8}$";
  let pattern = new RegExp(patternString);

  // si estamos validando al teclear, modificamos el patron
  // para ajustarse a la longitud del input del usuario
  if (event.type === "keyup") {
    if (inputUsuario.length < 1) null // no modificamos el formato inicial
    else if (inputUsuario.length < 5) {
      pattern = new RegExp(patternString.substring(0, inputUsuario.length + 2));
    } else if (inputUsuario.length < 12) {
      pattern = new RegExp(patternString.slice(0, -1));
    }
  }
  
  const valido = pattern.test(inputUsuario); //comparamos el telefono introducido con el formato esperado
  if (!valido) {
    telefono.classList.add("invalido");
    mensajeError.textContent = "Introduce un telefono movil de 9 digitos con prefijo +34";
  } else {
    if (telefono.classList.contains("invalido"))
      telefono.classList.remove("invalido");
    mensajeError.textContent = "";
  }

  return valido;
  
}

/*
 *============= Validacion direccion =============
 */
/**
 * Funcion que verifica que la direccion cumple los siguientes requisitos:
 *    - El campo contiene caracteres (no está relleno de espacios)
 *    - Debe contener letras, numeros y caracteres especiales (".", ",", "º")
 *    - El numero maximo de caracteres es 100
 * @returns true si la direccion es valida, false si no
 */



/*
 *============= Validacion minimo ingredientes =============
 */
//funcion en construccion
/**
 * Funcion que valida que hay al menos un ingrediente seleccionado
 * @returns true si al menos un ingrediente ha sido seleccionado, false si no
 */

function validarMinIngredientes() {
  let valido = false;
  const mensajeError = document.querySelector("#opciones-pizza p");
  const ingredientesChkboxes = document.querySelectorAll(
    '#opciones-pizza input[type="checkbox"]'
  );

  // iteramos por las checkboxes para ver si alguna esta marcada
  // y actualizar el resultado de la validacion
  for (let chkbox of ingredientesChkboxes) {
    if (chkbox.checked) {
      valido = true;
      break;
    }
  }

  // iteramos por las checkboxes para aniadir o quitar la clase "invalido"
  // segun el resultado de la validacion
  ingredientesChkboxes.forEach((chkbox) => {
    if (!valido) chkbox.classList.add("invalido");
    else if (chkbox.classList.contains("invalido"))
      chkbox.classList.remove("invalido");
  });

  // editamos el mensaje de error segun el resultado de la validacion
  if (valido) mensajeError.textContent = "";
  else mensajeError.textContent = "Elige al menos un ingrediente para tu pizza";

  return valido; //devolvemos el resultado de la validacion
}

/*
 *============= Funciones auxiliares =============
 */
/**
 * Funcion que verifica que los terminos y condiciones han sido aceptados
 * @returns true si se han aceptado, false si no
 */
function validarTerminos() {
  const mensajeError = document.querySelector(".terminos__error");

  if (!terminos.checked) {
    terminos.classList.add("invalido");
    mensajeError.textContent =
      "Es necesario aceptar los terminos y condiciones antes de realizar el pedido";
  } else {
    if (terminos.classList.contains("invalido"))
      terminos.classList.remove("invalido");
    mensajeError.textContent = "";
  }

  return terminos.checked;
}

/*
 *============= Funciones auxiliares =============
 */

 /*
 *============= CALCULO DE PRECIO =============
 */
