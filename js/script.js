window.onload = function(){

    //============= Validación del input EMAIL =============
    email.onsubmit = sinEspacios //Eliminar espacios
    email.onblur = caracteresMin //Tiene que tener más de 10 caracteres
    email.onsubmit = validaEmail //¿Contiene una @?
    //email.onblur = validacionClienteCorreo() //Solo aceptamos cuentas de Gmail -------NO FUNCIONA
   // email.onsubmit = cumplimentado() //Que el campo no esté vacío al hacer clic en Enviar
   
   var validacionEnvio;

   //Validación del campo nombre

   document.getElementById("nombre").onclick = function(){
   
        function validarNombre() {
        valor = document.getElementById("nombre").value;
        if (valor == null || valor.length == 0 || /^\s+$/.test(valor)) {
            alert('Falta Llenar Nombre');
            return false;
        } else {
            return true;
        }
    }
}
   //Validación del campo email


   document.getElementById("email").onclick = function(){

        //¿Como le devuelvo el valor de inputSinEspacios al valor del email?
        //funcion que devuelve el valor del input del email sin espacios
        function sinEspacios(){
            var inputConEspacios= document.getElementById("email").value;
            var inputSinEspacios = inputConEspacios.trim();
            var email = inputSinEspacios;
            return(email);
        }

        //funcion que limita las cuentas de correo de un determinado cliente -------NO FUNCIONA
        function validacionClienteCorreo() {
            var dominioValido = "gmail.com";
            var stringEmail = document.getElementById("email").value;
            console.log(stringEmail);
            var separador = "@";
            var dominioIntroducido = stringEmail.split(separador);
            console.log(dominioIntroducido);
            if (dominioIntroducido.toLowerCase()!==dominioValido.toLowerCase()){
                alert("Solo aceptamos cuentas de Gmail");
                //email.innerHTML += "<p>Solo aceptamos cuentas de Gmail</p>" //El párrafo se añade después del imput email
                validacionEnvio= "false";
            }
            
        }
        

        

        //funcion que establece el numero de caracteres mínimos
        function caracteresMin() {
            var minimoCaracteres = ("@gmail.com").length;
            if(email.value.length <= minimoCaracteres)
                //document.write('<p>Cuenta de correo demasiado corta'); --------BORRAR: lo imprime en otra página
                alert("Cuenta de correo demasiado corta");
                validacionEnvio= "false";
        }

        function validaEmail(){
            var inputEmail= document.getElementById("email").value.indexOf("@");
            if (inputEmail== -1){
                alert("No es un formato compatible con una dirección de correo");
                validacionEnvio= "false";
            }  

        }



    }

    //============= CÁLCULO PRECIO =============
    calcularPrecio() 

        var precio= 0;
        switch(document.getElementById("rbtam")) {
            case pequeña :
                precio+=5;
                break;
            case mediana :
                precio+=10;
                break;
            case familiar :
                precio+=15;
                break;
        }
        for (let i=1; i<=5; i++){
            let id= "cbox" + i;
            if(document.getElementById(id)== checked)
                precio += 1;
        }
        console.log(precio);



}



