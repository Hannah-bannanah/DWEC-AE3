window.onload = function () {
  //event listeners
  submit.addEventListener("click", validarFormulario);
  // pruebas.addEventListener('click', miFuncion);
};

/*
 *============= Validacion telefono =============
 */
/**
 * Funcion que verifica que el telefono tiene el formato de un movil espaniol
 * @returns true si el numero de telefono es valido, false si no
 */
function validarTlf() {
  const pattern = /^\+346[0-9]{8}$/;
  let inputUsuario = telefono.value.split(" ").join(""); //elimina todos los espacios del input
  return pattern.test(inputUsuario); //comparamos el telefono introducido con el formato esperado
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
  const checkboxes = document.querySelectorAll('#opciones-pizza input[type="checkbox"]')
  for (let chkbox of checkboxes) {
    if (chkbox.checked) return true;
  }
  return false;
}

/*
 *============= Validacion formulario =============
 */
function validarFormulario(event) {
  // validarCamposTexto();
  if (!validarTlf()) {
    event.preventDefault();
    console.log("Solo aceptamos telefonos moviles con prefijo +34");
  }
  if (!validarMinIngredientes()) {
    event.preventDefault();
    console.log("Elige al menos un ingrediente para tu pizza");
  }
  // validarEmail();
  // validarMinIngredientes();
}
