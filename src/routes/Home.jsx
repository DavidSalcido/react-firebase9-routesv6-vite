import React, { useEffect, useState } from 'react';
import Buttons from '../components/Buttons';
import Title from '../components/Title';
import { useFirestore } from '../hooks/useFirestore';

const Home = () => {

  const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore();
  const [ text, setText ] = useState( '' );
  const [ newOriginID, setNewOriginID ] = useState();

  useEffect( () => {
    console.log('getData');
    getData();
  }, [] );

  if ( loading.getData ) return <p>Cargando información...</p>;
  if ( error ) return <p> { error } </p>;

  const handleSubmit = async( e ) => {
    e.preventDefault();

    if ( text.trim() == '') {
      return;
    }

    if ( newOriginID ) {
      await updateData( newOriginID, text);
      setNewOriginID('');
      setText('');
      return;
    }

    await addData( text );
    setText('');
  }

  const handleClickDelete = async( nanoid ) => {
    await deleteData( nanoid );
  }

  const handleClickUpdate = async( item ) => {
    console.log('click edit');
    setText( item.origin );
    setNewOriginID( item.nanoid );
  }

  return (
    <>
        <Title text="Home" />

        <form onSubmit={ handleSubmit }>
          <input 
            placeholder='ex: http://bluuweb.org'
            type="text"
            value={ text }
            onChange={ e => setText(e.target.value) }
          />
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
            <div key={ item.nanoid } >
              <p> { item.nanoid} </p>
              <p> { item.origin} </p>
              <p> { item.uid} </p>
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
            </div>  
          ))  
        }
    </>    
  )
};

export default Home;