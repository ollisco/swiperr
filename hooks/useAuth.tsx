import React, { createContext, useContext } from 'react';
import {
  useAuthRequest, AccessTokenRequest, TokenResponse, exchangeCodeAsync,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import useAutoExchange from './useAutoExchange';

const CLIENT_ID = '561ad9eddee0418d8773090ae22723db'; // TODO: import from .env
const CLIENT_SECRET = '53d22b4eb34e4dbc906bf29f17212252';
WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

// TODO: Remove any
const SpotifyAuthContext: React.Context<{
  promptAsync: any
  token: any,
}> = createContext({
  promptAsync: null,
  token: null,
});

WebBrowser.maybeCompleteAuthSession();

/* eslint-disable no-unused-vars */
const phoneRedirectUri = 'exp://localhost:19000/';
const webRedirectUri = 'http://localhost:19006/';
// TODO: can maybe be replaced with: getRedirectUrl from expo auth session
/* eslint-enable no-unused-vars */
const redirectUri = Platform.OS === 'web' ? webRedirectUri : phoneRedirectUri;

// This is the functional component
export const SpotifyAuthProvider: React.FC = ({ children }) => {
  const [code, setCode] = React.useState<string>('');
  const [accessToken, setAccessToken] = React.useState<string>('');
  const [refreshToken, setRefreshToken] = React.useState<string>('');

  const [codeRequest, codeResponse, getCode] = useAuthRequest({
    clientId: CLIENT_ID,
    scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'],
    /*
      In order to follow the 'Authorization Code Flow',
      to fetch token after authorizationEndpoint,
      this must be set to false
    */
    usePKCE: false,
    redirectUri,
    clientSecret: CLIENT_SECRET,
  }, discovery);

  // The token will be auto exchanged after auth completes.
  const { token, tokenExchangeError: exchangeError } = useAutoExchange(
    codeResponse?.type === 'success' ? codeResponse.params.code : undefined,
  );

  React.useEffect(() => {
    if (token) {
      console.log('My Token:', token);
    }
  }, [token]);

  return (

    <SpotifyAuthContext.Provider
      value={{
        promptAsync: getCode,
        token,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export default function useSpotifyAuth() {
  return useContext(SpotifyAuthContext);
}
