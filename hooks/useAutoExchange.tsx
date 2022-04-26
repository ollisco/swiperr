import { exchangeCodeAsync, TokenResponse } from 'expo-auth-session';
import React from 'react';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import useMounted from './useMounted';
import { discovery, redirectUri } from './utils/auth-utils';

type State = {
  token: TokenResponse | null;
  tokenExchangeError: Error | null;
};

// A hook to automatically exchange the auth token for an access token.
// this should be performed in a server and not in the application.
function useAutoExchange(code?: string): State {
  const [currentState, setCurrentState] = React.useReducer(
    (state: State, action: Partial<State>) => ({ ...state, ...action }),
    { token: null, tokenExchangeError: null },
  );
  const isMounted = useMounted();

  React.useEffect(() => {
    if (!code) {
      setCurrentState({ token: null, tokenExchangeError: null });
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
          setCurrentState({ token, tokenExchangeError: null });
        }
      })
      .catch((exchangeError) => {
        if (isMounted.current) {
          setCurrentState({ tokenExchangeError: exchangeError, token: null });
        }
      });
  }, [code]);

  return currentState;
}

export default useAutoExchange;
