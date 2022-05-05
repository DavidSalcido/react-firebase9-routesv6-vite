import React from 'react'
import ButtonLoading from './ButtonLoading'

function Buttons( { 
  typeButton, 
  text, 
  color= "purple", 
  loading = false, 
  widthFull = true, 
  onclickEvent
} ) {
  
  if ( loading ) return <ButtonLoading text="Procesando..."/>
  
  let wFull = `w-full`;

  if ( !widthFull) wFull = ``; 

  return (
    <button 
      onClick={ onclickEvent }
      type={ typeButton } 
      className={`${wFull} text-white bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`}
    >
      { text }
    </button>
  )
}

export default Buttons