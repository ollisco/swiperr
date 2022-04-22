import React, { createContext, useContext, useState } from 'react';
import {
  useAuthRequest, AccessTokenRequest, TokenResponse, exchangeCodeAsync,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import useAutoExchange from './useAutoExchange';
import { discovery, redirectUri, meEndpoint } from './utils/auth-utils';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

// TODO: Remove any
const SpotifyAuthContext: React.Context<{
  promptAsync: any
  token: any,
  user: any,
  userTopItems: any,
}> = createContext({
  promptAsync: null,
  token: null,
  user: null,
  userTopItems: null,
});

WebBrowser.maybeCompleteAuthSession();

export const SpotifyAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userTopItems, setUserTopItems] = useState(null);
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

  async function getUserData(accessToken: string) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    };
    
    await axios.get(meEndpoint, config)
      .then(res => {
        console.log(res);
        setUser(res.data);
      })
      .catch(res => console.log('E: ', res));
  }

  async function getTopUserItems(accessToken: string, item: string) {
    // item should be 'tracks' or 'artists'
    const config = {
      headers: { 
        Authorization: `Bearer ${accessToken}`,
      }        
    };
    await axios.get(`${meEndpoint}/top/${item}`, config)
      .then(res => {
        console.log(res);
        setUserTopItems(res.data);
      })
      .catch(res => console.log('E: ', res));
  }

  React.useEffect(() => {
    if (token) {
      console.log('My Token:', token);
      
      getUserData(token.accessToken);
      //getTopUserItems(token.accessToken, 'tracks');
      

      }
  }, [token]);

  return (
    <SpotifyAuthContext.Provider
      value={{
        promptAsync,
        token,
        user,
        userTopItems,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export default function useSpotifyAuth() {
  return useContext(SpotifyAuthContext);
}
