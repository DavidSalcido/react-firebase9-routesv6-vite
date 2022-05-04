import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import { formValidate } from '../utils/formValidate';
import { useForm } from 'react-hook-form';
import { erroresFirebase } from '../utils/erroresFirebase';
import FormInput from '../components/FormInput';
import FormError from '../components/FormError';
import Title from '../components/Title';
import Buttons from '../components/Buttons';

const Login = () => {
    const { loginUser } = useContext( UserContext );
    const navegate = useNavigate();
    const  { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        setError  
    } = useForm();
    const { required, patternEmail, minLength, validateTrim } = formValidate();

    const onSubmit = async( data, e ) => {
        e.preventDefault();
        try {
            await loginUser( data.email, data.password );
            navegate( '/' );
        } catch ( error ) {
            //console.log( error.code );
            const { code, message } = erroresFirebase( error.code );
            setError( code, {
                message: message,
            });  
        }
    };

    return (
        <>
            <Title text="Iniciar sesión" />
            <form onSubmit={ handleSubmit( onSubmit ) } >
                <FormInput
                    type="email" 
                    placeholder='Ingrese su correo electronico' 
                    {...register( 'email',  
                        { 
                            required: required,
                            pattern: patternEmail
                        } 
                    )}
                    labelText="Usuario"
                >
                    <FormError error={ errors.email } />
                </FormInput>

                <FormInput 
                    type="password" 
                    placeholder='Ingrese su contraseña' 
                    {...register( 'password', 
                        { 
                            required: required,
                            validate: validateTrim,    
                        }
                    )}
                    labelText="Contraseña"
                >
                    <FormError error={ errors.password } />
                </FormInput>

                <Buttons typeButton="submit" text="Iniciar sesión" />
            </form>
        </>
    )
};

export default Login;