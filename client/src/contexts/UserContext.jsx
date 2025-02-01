import React,{ createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenicated] = useState(false);

    const updateIsAuthenticated = () => {
        setIsAuthenicated(prevState => !prevState);
    }

    return (
        <UserContext.Provider value={{user, setUser, isAuthenticated, updateIsAuthenticated}}>
            {children}
        </UserContext.Provider>
    )
}