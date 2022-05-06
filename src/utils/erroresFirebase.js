export const erroresFirebase = ( error ) => {
    switch ( error.code ) {
        case "auth/email-already-in-use":
            return {
                code: 'email',
                message: "Usuario ya registrado",
            };
        case "auth/invalid-email":
            return {
                code: 'email',
                message: "Formato de email incorrecto",
            };
        case "auth/user-not-found":
            return {
                code: 'email',
                message: "Usuario y/o contraseña incorrecta",
            }; 
        case "auth/wrong-password":
            return {
                code: 'password',
                message: "Contraseña incorrecta",
            };
        case "fieldUrlEmpty":
            return {
                code: 'url',
                message: "Url vacio",
            }                
        default:
            return {
                code: 'email',
                message: "Ocurrio un error en el server",
            };  
    }
};