import { async } from '@firebase/util';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import { UserContext } from '../context/UserProvider';
import erroresFirebase from '../utils/erroresFirebase';
import formValidate from '../utils/formValidate';

export const Register = () => {
    const navegate = useNavigate();
    const { registerUser } = useContext( UserContext );
    const  { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        getValues,
        setError  
    } = useForm();
    const { validate, patternEmail, minLength, validateTrim, validateEquals } = formValidate();

    const onSubmit = async( data ) => {
        try {
            await registerUser( data.email, data.password );
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
            <div>Register</div>
            <FormError error={ errors.firebase } />
            <form onSubmit={ handleSubmit( onSubmit ) }>
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
                
                <FormInput
                    type="password" 
                    placeholder='Ingrese nuevamente la contraseña' 
                    {...register( 'repassword', 
                        { 
                            minLength: minLength,
                            validate: validateEquals( getValues ), 
                        }
                    )}
                >
                    <FormError error={ errors.repassword } />
                </FormInput>
                
                <button type='submit'> Registrar </button>
            </form>
        </>
    )
}

export default Register;