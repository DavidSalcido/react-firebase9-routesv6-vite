import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Buttons from '../components/Buttons';
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title';
import { useFirestore } from '../hooks/useFirestore';
import { formValidate } from '../utils/formValidate';
import { erroresFirebase } from '../utils/erroresFirebase';

const Home = () => {
  const [ copy, setCopy] = useState( {} );
  const { required, patternURL } = formValidate();
  const  { 
      register, 
      handleSubmit, 
      formState: { errors }, 
      resetField,
      setValue,
      setError  
  } = useForm();
  const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore();
  const [ newOriginID, setNewOriginID ] = useState();
  const pathUrl = window.location.href;

  useEffect( () => {
    getData();
  }, [] );

  if ( loading.getData ) return <p>Cargando información...</p>;
  if ( error ) return <p> { error } </p>;

  const onSubmit = async( { url } ) => {
    try {
      if ( url.trim() == '') {
        const { code, message } = erroresFirebase( 'fieldUrlEmpty' );
        setError( code, {
            message: message,
        });  
        return;
      }

      if ( newOriginID ) {
        await updateData( newOriginID, url);
        setNewOriginID('');
        resetField( 'url' );
      }
      else {
        await addData( url );
      }

      resetField( 'url' );
    } catch ( error ) {
      const { code, message } = erroresFirebase( error.code );
      setError( code, {
          message: message,
      }); 
    }
  }

  const handleClickDelete = async( nanoid ) => {
    await deleteData( nanoid );
  }

  const handleClickUpdate = async( item ) => {
    setValue( 'url', item.origin );
    setNewOriginID( item.nanoid );
  }

  const handleClickCopyUrl = async( nanoid ) => {
    await navigator.clipboard.writeText( pathUrl + nanoid );
    setCopy( { [nanoid]: true } );
  }

  return (
    <>
        <Title text="Home" />

        <form onSubmit={ handleSubmit( onSubmit ) }>
          <FormInput
              type="text" 
              placeholder='ex: https://bluuweb.org' 
              {...register( 'url',  
                  { 
                      required: required,
                      pattern: patternURL
                  } 
              )}
              labelText="URL"
              error={errors.url}
          >
            <FormError error={ errors.url } />
          </FormInput>

          {
            newOriginID 
              ? (
                <Buttons 
                  typeButton="submit"
                  text="Editar url"
                  color="yellow"
                  loading={loading.updateData}
                  widthFull={false}
                />    
              )
              : (
                <Buttons 
                  typeButton="submit"
                  text="Agregar url"
                  color="blue"
                  loading={loading.addData}
                  widthFull={false}
                />
              )
          }
        </form>

        {
          data.map( (item) => (
            <div 
              key={ item.nanoid } 
              className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-2 mt-2"
            >
              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'> { pathUrl }{ item.nanoid } </h5>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'> { item.origin } </p>
              <div className='flex space-x-2'>
                <Buttons 
                  typeButton="button"
                  text="Editar"
                  color="yellow"
                  widthFull={false}
                  onclickEvent={ () => handleClickUpdate( item ) }
                />
                <Buttons 
                  typeButton="button"
                  text="Eliminar"
                  color="red"
                  loading={loading[ item.nanoid ]}
                  widthFull={false}
                  onclickEvent={ () => handleClickDelete( item.nanoid ) }
                />
                <Buttons 
                  typeButton="button"
                  text={ copy[ item.nanoid ] ? 'Copiado' : 'Copiar URL'}
                  color="blue"
                  widthFull={false}
                  onclickEvent={ () => handleClickCopyUrl( item.nanoid ) }
                />
              </div>
            </div>  
          ))  
        }
    </>    
  )
};

export default Home;