import { Platform } from 'react-native';
import { REDIRECT_URI, REDIRECT_URI_WEB } from '@env';

// TODO: can maybe be replaced with: getRedirectUrl from expo auth session
const redirectUri = Platform.OS === 'web' ? REDIRECT_URI_WEB : REDIRECT_URI;
console.log(REDIRECT_URI, REDIRECT_URI_WEB);
const authorizationEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const meEndpoint = 'https://api.spotify.com/v1/me';
const recomendationEndpoint = 'https://api.spotify.com/v1/recommendations';

const discovery = {
  authorizationEndpoint,
  tokenEndpoint,
};

export {
  redirectUri, discovery, meEndpoint, recomendationEndpoint,
};
