window.onload = function () {
  //event listeners
  submit.addEventListener("click", validarFormulario); //validacion del formulario completo

  // pruebas.addEventListener('click', validarRestaurante);

  //validacion inmediata de la direccion
  ConText2.addEventListener("keyup", function(){
    var direccion = document.getElementById("ConText2");
    var mensajeErrorDireccion=document.querySelector(".direccion-error");
    if (direccion.classList.contains("invalido")){
      direccion.classList.remove("invalido");
    mensajeErrorDireccion.textContent = "";
    }
  });
  
  //validacion inmediata del telefono
  telefono.addEventListener("keyup", validarTlf);

  // validacion inmediata del minimo de ingredientes
  const ingredientesChkboxes = document.querySelectorAll(
    '#opciones-pizza input[type="checkbox"]'
  );
  ingredientesChkboxes.forEach((chkbox) =>
    chkbox.addEventListener("click", validarMinIngredientes)
  );

  // validacion inmediata de seleccion de restaurante
  restaurante.onchange = validarRestaurante; //valida cada vez que cambia la seleccion
  
  //validacion inmediata de los radio button MASA
  const masaRadioButton = document.getElementsByName("masa");
  for(var i=0; i<masaRadioButton.length; i++) {
    masaRadioButton[i].addEventListener("click", validarMasa)
  }

  //validacion inmediata de los radio button TAMANIO
  const tamanioRadioButton = document.getElementsByName("tamanio");
  for(var i=0; i<tamanioRadioButton.length; i++) {
    tamanioRadioButton[i].addEventListener("click", validarTamanio)
  }
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
  if (!validarDireccion()) valido = false;
  if (!validarTlf(event)) valido = false;
  if (!validarMinIngredientes()) valido = false;
  if (!validarEmail()) valido = false;
  // validarRadio();
  // if (!validarRestaurante()) valido = false;
  if (!validarMasa()) valido= false;
  if (!validarTamanio()) valido= false;


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
    if (inputUsuario.length < 1) null;
    // no modificamos el formato inicial
    else if (inputUsuario.length < 5) {
      pattern = new RegExp(patternString.substring(0, inputUsuario.length + 2));
    } else if (inputUsuario.length < 12) {
      pattern = new RegExp(patternString.slice(0, -1));
    }
  }

  const valido = pattern.test(inputUsuario); //comparamos el telefono introducido con el formato esperado
  if (!valido) {
    telefono.classList.add("invalido");
    mensajeError.textContent =
      "Introduce un telefono movil de 9 digitos con prefijo +34";
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
 *    - El campo contiene caracteres (no está relleno únicamente de espacios)
 *    - Debe contener al menos: una mayúscula, un número
 *    - La longitud mínima de la cadena es 20 caracteres
 *    - La longitud máxima es 150 caracteres. Esto viene definido con el atributo "maxLength" en el HTML.
 * @returns true si la direccion es valida, false si no
 */

function validarDireccion(evento) {
  //Seleccionamos el primer nodo hijo que deriva del nodo <p></p> cuya clase es "mensaje-error direccion-error"
  const mensajeErrorDireccion = document.querySelector(".direccion-error");
  let valido = false;
  const caracteresString = "^[A-Z]{1,}[0-9]{1,}";
  let caracteres = new RegExp(caracteresString);

  //En primer lugar, eliminamos los espacios duplicados y los espacios al comienzo y al final del input
  let direccion = document.getElementById("ConText2");
  let input = direccion.value.trim();
  input.replace(/ {2,}/g, " ");

  //En segundo lugar, comprobamos que el input contiene, al menos, 40 caracteres y contiene una mayus y un numero
  if (input.length < 20 && caracteres.test(input) == false) {
    valido = false;
  } else {
    valido = true;
  }

  //Validamos el contenido final

  if (!valido) {
    direccion.classList.add("invalido");
    
    mensajeErrorDireccion.textContent = 
      "El campo direccion debe contener min 20 caracteres, un numero y comenzar con una mayuscula";
  } else {
    if (direccion.classList.contains("invalido")){
      direccion.classList.remove("invalido");
    mensajeErrorDireccion.textContent = "";
    }
  }

  return valido;

}

/*
 *============= Validacion email =============
 */
/**
 * Funcion que verifica que el email cumple los siguientes requisitos:
 *    + Elimina cualquier espacio introducido.
 *    + Debe contener solo una "@".
 *    + Permitir la inclusión de: caracteres del abecedario, en mayusculas o minusculas, números, ".", "-" y "_"
 *    + Debe contener al menos un punto.
 *    + La "@" y el punto no puden estar inmediatamente juntos.
 * @returns true si el email es válido, false si no
 */

function validarEmail() {
  //Seleccionamos el primer nodo hijo que deriva del nodo <p> cuya clase es "mensaje-error email-error"
  const mensajeErrorEmail = document.querySelector(".email-error");
  let valido = false;

  /* El primer bloque que va desde el primer caracter hasta el anterior de la "@"
   * debe tener al menos un caracter en minisculas, mayusculas, numerico o un punto, guion o barra baja.
   * El bloque que va desde el caracter después de la "@" y hasta el punto
   * debe tener al menos un caracter en minisculas, mayusculas, numerico o un guion.
   *  Detras del punto puede haber 2, 3 o 4 caracteres en mayúsculas o minusculas.
   */
  const patternEmail = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+.[a-zA-Z]{2,4}$";

  let patronEmail = new RegExp(patternEmail);

  //En primer lugar, eliminamos cualquier espacio introducido
  let inputEmail = email.value.split(" ").join("");

  //En segundo lugar, comprobamos que el input cumple con el patron definido
  if (patronEmail.test(inputEmail) == false) {
    valido = false;
  } else {
    valido = true;
  }

  //Validamos el contenido final

  if (!valido) {
    email.classList.add("invalido");
    mensajeErrorEmail.textContent =
      "El email introducido no tiene el formato correcto";
  } else {
    if (email.classList.contains("invalido"))
      email.classList.remove("invalido");
    mensajeErrorEmail.textContent = "";
  }

  return valido;
}

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

 *============= Validacion Radio buttons: tipo de masa y tamanio =============
 */
/**
 * Funcion que verifica que se ha seleccionado únicamente un tipo de masa.
 * @returns true si se han aceptado, false si no
 */

function validarMasa(){
  let valido = false;
  const mensajeErrorMasa = document.querySelector(".error-masa");
  const masaRadioButton = document.getElementsByName("masa");

  // Iteramos por los radio button para ver si alguno esta marcado
  for(var i=0; i<masaRadioButton.length; i++) {
    if(masaRadioButton[i].checked) {
        valido = true;
        break;
    }
}

  // Iteramos por los radio button para aniadir o quitar la clase "invalido"
  for (var j=0; j<masaRadioButton.length; j++){
    if (!valido){
      masaRadioButton[j].classList.add("invalido");
    }else if (masaRadioButton[j].classList.contains("invalido")){
      masaRadioButton[j].classList.remove("invalido");
    }
  }

//Editamos el mensaje de error segun el resultado de la validacion
  if (valido) mensajeErrorMasa.textContent = "";
  else mensajeErrorMasa.textContent = "Elige el tipo de masa";

  return valido;
}

/**
 * Funcion que verifica que se ha seleccionado únicamente un tamanio.
 * @returns true si se han aceptado, false si no
 */
function validarTamanio(){
  let valido = false;
  const mensajeErrorTamanio = document.querySelector(".error-tamanio");
  const tamanioRadioButton = document.getElementsByName("tamanio");

  // Iteramos por los radio button para ver si alguno esta marcado
  for(var i=0; i<tamanioRadioButton.length; i++) {
    if(tamanioRadioButton[i].checked) {
        valido = true;
        break;
    }
}

  // Iteramos por los radio button para aniadir o quitar la clase "invalido"
  for (var j=0; j<tamanioRadioButton.length; j++){
    if (!valido){
      tamanioRadioButton[j].classList.add("invalido");
    }else if (tamanioRadioButton[j].classList.contains("invalido")){
      tamanioRadioButton[j].classList.remove("invalido");
    }
  }

//Editamos el mensaje de error segun el resultado de la validacion
  if (valido) mensajeErrorTamanio.textContent = "";
  else mensajeErrorTamanio.textContent = "Elige el tamaño de la pizza";

  return valido;
}

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
 *============= Validacion restaurante =============
 */

/**
 * Funcion que verifica que hay un restaurante seleccionado
 * @returns true si se ha elegido restaurante, false si no
 */
function validarRestaurante() {
  const opcionesRestaurante = restaurante.querySelectorAll('option:not([value=""])');

  for (const rest of opcionesRestaurante) {
    if (rest.selected) {
      if (restaurante.classList.contains('invalido'))
        restaurante.classList.remove('invalido')
      return true;
    }
  }
  restaurante.classList.add('invalido');
  return false;
}

/*
 *============= Funciones auxiliares =============
 */

/*
 *============= CALCULO DE PRECIO =============
 */
