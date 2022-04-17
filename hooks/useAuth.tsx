import { View, Text } from 'react-native';
import React, { createContext, useContext, useState } from 'react';
//import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

const CLIENT_ID = "561ad9eddee0418d8773090ae22723db" //TODO: import from .env
//WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

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


const SpotifyAuthContext: React.Context<{
    promptAsync: any
    response: any
    request: any,
    accessToken: string
}> = createContext({
    promptAsync: null,
    request: null,
    response: null,
    accessToken: '',
});






WebBrowser.maybeCompleteAuthSession();



// This is the functional component
export const SpotifyAuthProvider: React.FC = ({ children }) => {
    const [accessToken, setAccessToken] = React.useState<string>('');
    const [request, response, promptAsync] = useAuthRequest({
      clientId: CLIENT_ID,
      scopes: ['user-read-email', 'playlist-modify-public'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: 'exp://127.0.0.1:19000/',
      //redirectUri: 'http://localhost:19006/',
    }, discovery);

    React.useEffect(() => {
        if (response?.type === 'success') {
            
            // const ensureToken = response.authentication ? response.authentication?.accessToken : '';
            const { code } = response.params;
            console.log('sucessfully recieve token: '+ code);
            setAccessToken(code);   
        }
    }, [response]);

    console.log('rendering');
    return (
      
        <SpotifyAuthContext.Provider
            value={{
                response,
                request,
                promptAsync,
                accessToken,
            }}>
            {children}
        </SpotifyAuthContext.Provider>
    );
    
}

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

export function useSpotifyAuth() {
    return useContext(SpotifyAuthContext);
}