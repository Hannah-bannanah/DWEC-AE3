window.onload = function() {
  //event listeners
  submit.addEventListener('click', validarFormulario)
}



/*
*============= Validacion telefono =============
*/

function validarTlf(event) {
  const inputUsuario = telefono.value.trim();
  console.log(inputUsuario);
  return false;
}

/*
*============= Funciones de validacion =============
*/
function validarFormulario(event) {
  // validarCamposTexto();
  if (validarTlf(event)) console.log('success');
  else {
    event.preventDefault();
    console.log('uh-oh!');
  }
  // validarEmail();
  // validacionMinIngredientes();

}