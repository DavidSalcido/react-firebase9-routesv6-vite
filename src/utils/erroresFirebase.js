const erroresFirebase = ( error ) => {
    switch ( error.code ) {
        case "auth/email-already-in-use":
            return "Usuario ya registrado";
        case "auth/invalid-email":
            return "Formato de email incorrecto";  
        default:
            return 'Ocurrio un error en el server';   
    }
}

export default erroresFirebase;