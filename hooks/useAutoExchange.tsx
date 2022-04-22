import { exchangeCodeAsync, TokenResponse } from 'expo-auth-session';
import React from 'react';
import { Platform } from 'react-native';
import useMounted from './useMounted';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import { discovery, redirectUri } from './utils/auth-utils';




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
