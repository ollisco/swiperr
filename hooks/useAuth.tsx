import { View, Text } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


interface AuthContextType {
    user?: string;
    accessToken?: string | undefined;
}

const AuthContext: React.Context<{
    user: any,
    getUser: any,
    accessToken: string,
    promptAsync: any
}> = createContext({
    user: null,
    getUser: null,
    accessToken: '',
    promptAsync: null,
});



export const AuthProvider: React.FC = ({ children }) => {
    const [accessToken, setAccessToken] = React.useState<string | undefined>();
    const [userInfo, setUserInfo] = React.useState();
    const [message, setMessage] = React.useState<any>();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '1029181124854-4525710ob94m95h69ac6vqosd004dic9.apps.googleusercontent.com',
        iosClientId: '1029181124854-lsnpj2grnerbges0jio1rbj2ggo29o41.apps.googleusercontent.com',
        expoClientId: '1029181124854-4vfhtis83ajcdns1nlauac7jg10drs4p.apps.googleusercontent.com',
        webClientId: '1029181124854-4525710ob94m95h69ac6vqosd004dic9.apps.googleusercontent.com'
    });

    React.useEffect(() => {
        console.log(0);
        setMessage(JSON.stringify(response));
        if (response?.type === 'success') {
            // const ensureToken = response.authentication ? response.authentication?.accessToken : '';
            setAccessToken(response.authentication?.accessToken);
        }
    }, [response]);

    async function getUserData() {
        const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
    
        userInfoResponse.json().then(data => {
            setUserInfo(data);
        });
    }
    return (
        <AuthContext.Provider
            value={{
                user: userInfo,
                getUser: getUserData,
                accessToken: accessToken ? accessToken : '',
                promptAsync,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth() {
    return useContext(AuthContext);
}