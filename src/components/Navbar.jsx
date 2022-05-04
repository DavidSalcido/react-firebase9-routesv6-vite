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

    return (
        <div>
            { user ? (
                    <>
                        <Link to="/"> Inicio </Link>
                        <button onClick={ handlerClickLogout }> Cerrar Sesión </button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login"> Login | </NavLink>
                        <NavLink to='/register'> Registrate | </NavLink>
                    </>
                )
            }       
        </div>
    )
}

export default Navbar;