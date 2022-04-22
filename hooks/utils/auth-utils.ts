import { Platform } from 'react-native';

/* eslint-disable no-unused-vars */
// TODO: can maybe be replaced with: getRedirectUrl from expo auth session
const phoneRedirectUri = 'exp://localhost:19000/';
const webRedirectUri = 'http://localhost:19006/';
const redirectUri = Platform.OS === 'web' ? webRedirectUri : phoneRedirectUri;
/* eslint-enable no-unused-vars */

const authorizationEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';
const meEndpoint = 'https://api.spotify.com/v1/me';

const discovery = {
  authorizationEndpoint,
  tokenEndpoint,
};

export { redirectUri, discovery, meEndpoint };
