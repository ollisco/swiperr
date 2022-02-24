import { View, Text } from 'react-native';
import React, { createContext, useContext, useState } from 'react';




const AuthContext = createContext({
    user: '',
});



export const AuthProvider: React.FC = ({ children }) => {
    return (
        <AuthContext.Provider
            value={{user: ''}}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}