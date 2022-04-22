import React, { createContext, useContext } from 'react';
import {
  useAuthRequest, AccessTokenRequest, TokenResponse, exchangeCodeAsync,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import useAutoExchange from './useAutoExchange';
import { discovery, redirectUri } from './utils/auth-utils';

WebBrowser.maybeCompleteAuthSession();

// TODO: Remove any
const SpotifyAuthContext: React.Context<{
  promptAsync: any
  token: any,
}> = createContext({
  promptAsync: null,
  token: null,
});

WebBrowser.maybeCompleteAuthSession();

export const SpotifyAuthProvider: React.FC = ({ children }) => {
  const [request, response, promptAsync] = useAuthRequest({
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

  // Token will be auto exchanged after auth completes.
  const { token, tokenExchangeError: exchangeError } = useAutoExchange(
    response?.type === 'success' ? response.params.code : undefined,
  );

  React.useEffect(() => {
    if (token) {
      console.log('My Token:', token);
    }
  }, [token]);

  return (

    <SpotifyAuthContext.Provider
      value={{
        promptAsync,
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
