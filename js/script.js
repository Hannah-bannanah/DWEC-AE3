//============= Validación del input EMAIL =============

window.onload = function(){
    //ConText5.onblur = validacionClienteCorreo() //Solo aceptamos cuentas de Gmail -------NO FUNCIONA
    ConText5.onblur = caracteresMin //Tiene que tener más de 10 caracteres
    ConText5.onsubmit = sinEspacios() //Eliminar espacios
   // ConText5.onsubmit = cumplimentado() //Que el campo no esté vacío al hacer clic en Enviar
    


    //funcion que limita las cuentas de correo de un determinado cliente -------NO FUNCIONA
   document.getElementById("ConText5").onclick = function(){
    
    function validacionClienteCorreo() {
        var dominioValido = "gmail.com";
        var stringEmail = document.getElementById("ConText5").value;
        console.log(stringEmail);
        var separador = "@";
        var dominioIntroducido = stringEmail.split(separador);
        console.log(dominioIntroducido);
        if (dominioIntroducido!==dominioValido){
            alert("Solo aceptamos cuentas de Gmail");
        }
        return dominioValido.toLowerCase() === dominioValido.toLowerCase()
        
        }
    }

    

    //funcion que establece el numero de caracteres mínimos
    function caracteresMin() {
        var minimoCaracteres = ("@gmail.com").length;
        if(ConText5.value.length <= minimoCaracteres)
            //document.write('<p>Cuenta de correo demasiado corta'); --------BORRAR: lo imprime en otra página
            alert("Cuenta de correo demasiado corta");
    }


    //¿Como le devuelvo el valor de inputSinEspacios al valor del ConText5?
    function sinEspacios(){
        var inputConEspacios= document.getElementById("ConText5").value;
        var inputSinEspacios = inputConEspacios.trim();
        return(inputSinEspacios);
    }

}


