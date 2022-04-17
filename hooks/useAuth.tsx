import React, { createContext, useContext } from 'react';
import { useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

const CLIENT_ID = '561ad9eddee0418d8773090ae22723db'; // TODO: import from .env
WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

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
    redirectUri: 'exp://127.0.0.1:19006/',
    // redirectUri: 'http://localhost:19006/',
  }, discovery);

  React.useEffect(() => {
    if (response?.type === 'success') {
      // const ensureToken = response.authentication ? response.authentication?.accessToken : '';
      const { code } = response.params;
      console.log(`sucessfully recieve token: ${code}`);
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
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export default function useSpotifyAuth() {
  return useContext(SpotifyAuthContext);
}
