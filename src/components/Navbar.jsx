import { useContext } from 'react';
import { Link, NavLink  } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

const Navbar = () => {

    const { user, setUser } = useContext( UserContext );

    return (
        <div>
            { user ? (
                    <>
                        <Link to="/"> Inicio </Link>
                        <button onClick={ () => setUser( false ) }> Salir </button>
                    </>
                ) : (
                    <NavLink to="/login"> Login </NavLink>
                )
            }       
        </div>
    )
}

export default Navbar;