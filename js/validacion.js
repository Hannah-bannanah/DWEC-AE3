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
function validarMinIngredientes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (let chkbox of checkboxes) {
    if (chkbox.selected) console.log('selected!')
  }
  return true;
}

/*
 *============= Validacion formulario =============
 */
function validarFormulario(event) {
  // validarCamposTexto();
  if (!validarTlf()) {
    event.preventDefault();
    console.log("mete un telefono espaniol de espania");
  }
  if (!validarMinIngredientes()) {
    event.preventDefault();
    console.log("uh-oh!");
  }
  // validarEmail();
  // validarMinIngredientes();
}
