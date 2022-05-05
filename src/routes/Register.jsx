import { async } from '@firebase/util';
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ButtonLoading from '../components/ButtonLoading';
import Buttons from '../components/Buttons';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import { UserContext } from '../context/UserProvider';
import { erroresFirebase } from '../utils/erroresFirebase';
import { formValidate } from '../utils/formValidate';

export const Register = () => {
    const [ loading, setLoading ] = useState( false );
    const navegate = useNavigate();
    const { registerUser } = useContext( UserContext );
    const  { 
        register, 
        handleSubmit, 
        formState: { errors }, 
        getValues,
        setError  
    } = useForm();
    const { required, patternEmail, minLength, validateTrim, validateEquals } = formValidate();

    const onSubmit = async( data, e ) => {
        e.preventDefault();
        try {
            setLoading( true );
            await registerUser( data.email, data.password );
            navegate( '/' );
        } catch ( error ) {
            //console.log( error.code );
            const { code, message } = erroresFirebase( error.code );
            setError( code, {
                message: message,
            });  
        } finally {
            setLoading( false );
        }
    };

    return (
        <>
            <Title text="Registro de usuario" />
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <FormInput
                    type="email" 
                    placeholder='Ingrese un correo electronico' 
                    {...register( 'email',  
                        { 
                            required: required,
                            pattern: patternEmail
                        } 
                    )}
                    labelText="Correo electrónico"
                    error={ errors.email }
                >
                    <FormError error={ errors.email } />
                </FormInput>
                
                <FormInput 
                    type="password" 
                    placeholder='Ingrese una contraseña' 
                    {...register( 'password', 
                        { 
                            required: required,
                            minLength: minLength,
                            validate: validateTrim,    
                        }
                    )}
                    labelText="Contraseña"
                    error={ errors.password }
                >
                    <FormError error={ errors.password } />
                </FormInput>
                
                <FormInput
                    type="password" 
                    placeholder='Ingrese nuevamente la contraseña' 
                    {...register( 'repassword', 
                        { 
                            required: required,
                            minLength: minLength,
                            validate: validateEquals( getValues( 'password' ) ), 
                        }
                    )}
                    labelText="Repetir contraseña" 
                    error={ errors.repassword }
                >
                    <FormError error={ errors.repassword } />
                </FormInput>
                <Buttons typeButton="submit" text="Registrar" loading={loading}/>
            </form>
        </>
    )
}

export default Register;