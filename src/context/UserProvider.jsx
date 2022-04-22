import { useState } from "react";
import { createContext } from "react";

export const UserContext   = createContext();

const UserProvider  = ( props ) => {

    const [ user, setUser ] = useState( false );

    return (
        <UserContext.Provider value={ { user, setUser } }>
            { props.children }
        </UserContext.Provider>
    );
}

export default UserProvider;