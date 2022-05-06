import { useContext } from 'react';
import { Link, NavLink  } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Navbar = () => {

    const { user, signOutUser } = useContext( UserContext );

    const handlerClickLogout = async() => {
        try {
            await signOutUser()
        } catch ( error ) {
            console.log( error.code );
        }
    }

    const classButtonBlue   = 'w-36 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';
    const classButtonRed    = 'w-36 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800';

    return (
        <nav className='flex justify-start bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800'>
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to="/" className='flex items-center'> 
                    <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
                        URL_LOGO 
                    </span>
                </Link>
            </div>    
            <div className="flex md:order-2">
                { user ? (
                        <>
                            <NavLink to="/" className={ classButtonBlue }> Inicio </NavLink>
                            <button onClick={ handlerClickLogout } className={ classButtonRed }> Cerrar Sesión </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={ classButtonBlue }> Iniciar Sesión </NavLink>
                            <NavLink to='/register' className={ classButtonBlue }> Registrate </NavLink>
                        </>
                    )
                }      
            </div> 
            
        </nav>
    )
}

export default Navbar;