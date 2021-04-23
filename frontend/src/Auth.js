import React, { useState, useEffect, useContext } from 'react';
import fire from './fire';
import { auth } from './fire';
// stores the user that is logged in 

export const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const[currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsub;
        }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
