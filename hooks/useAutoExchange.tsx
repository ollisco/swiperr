import { exchangeCodeAsync, TokenResponse } from 'expo-auth-session';
import React from 'react';
import { Platform } from 'react-native';
import useMounted from './useMounted';

const CLIENT_ID = '561ad9eddee0418d8773090ae22723db'; // TODO: import from .env
const CLIENT_SECRET = '53d22b4eb34e4dbc906bf29f17212252';

/* eslint-disable no-unused-vars */
const phoneRedirectUri = 'exp://localhost:19000/';
const webRedirectUri = 'http://localhost:19006/';
// TODO: can maybe be replaced with: getRedirectUrl from expo auth session
/* eslint-enable no-unused-vars */
const redirectUri = Platform.OS === 'web' ? webRedirectUri : phoneRedirectUri;

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

type State = {
  token: TokenResponse | null;
  tokenExchangeError: Error | null;
};

// A hook to automatically exchange the auth token for an access token.
// this should be performed in a server and not in the application.
function useAutoExchange(code?: string): State {
  const [state, setState] = React.useReducer(
    (state: State, action: Partial<State>) => ({ ...state, ...action }),
    { token: null, tokenExchangeError: null },
  );
  const isMounted = useMounted();

  React.useEffect(() => {
    if (!code) {
      setState({ token: null, tokenExchangeError: null });
      return;
    }
    exchangeCodeAsync(
      {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        code,
        redirectUri,
      },
      discovery,
    )
      .then((token) => {
        if (isMounted.current) {
          setState({ token, tokenExchangeError: null });
        }
      })
      .catch((exchangeError) => {
        if (isMounted.current) {
          setState({ tokenExchangeError: exchangeError, token: null });
        }
      });
  }, [code]);

  return state;
}

export default useAutoExchange;
