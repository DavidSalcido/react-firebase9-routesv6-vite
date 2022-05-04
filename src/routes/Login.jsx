import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import formValidate from '../utils/formValidate';
import { useForm } from 'react-hook-form';
import erroresFirebase from '../utils/erroresFirebase';
import FormInput from '../components/FormInput';
import FormError from '../components/FormError';

const Login = () => {
    const { loginUser } = useContext( UserContext );
    const navegate = useNavigate();
    const  { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        setError  
    } = useForm();
    const { validate, patternEmail, minLength, validateTrim } = formValidate();

    const onSubmit = async( data ) => {
        try {
            await loginUser( data.email, data.password );
            console.log( 'Usuario creado correctamente' );
            navegate( '/' );
        } catch ( error ) {
            console.log( error.code );
            setError( 'firebase', {
                message: erroresFirebase( error.code ),
            });  
        }
    };

    return (
        <>
            <div>Login</div>
            <FormError error={ errors.firebase } />
            <form onSubmit={ handleSubmit( onSubmit ) } >
                <FormInput
                    type="email" 
                    placeholder='Ingrese un correo electronico' 
                    {...register( 'email',  
                        { 
                            required: validate,
                            pattern: patternEmail
                        } 
                    )}
                >
                    <FormError error={ errors.email } />
                </FormInput>

                <FormInput 
                    type="password" 
                    placeholder='Ingrese la contraseña' 
                    {...register( 'password', 
                        { 
                            minLength: minLength,
                            validate: validateTrim,    
                        }
                    )}
                >
                    <FormError error={ errors.password } />
                </FormInput>

                <button type='submit'> Iniciar sesión </button>
            </form>
        </>
    )
};

export default Login;