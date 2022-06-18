import { Platform } from 'react-native';
import { REDIRECT_URI, REDIRECT_URI_WEB } from '@env';

// TODO: can maybe be replaced with: getRedirectUrl from expo auth session
const devRedirect = 'http://localhost:19006/';
const deployRedirect = 'https://ollisco.github.io/swiperr/';

const redirectUriWeb = [devRedirect, deployRedirect].includes(window.location.href)
  ? window.location.href : REDIRECT_URI_WEB;
const redirectUri = Platform.OS === 'web' ? redirectUriWeb : REDIRECT_URI;
console.log(redirectUri, window.location.href);
// TODO: add all endpoints to here instead of useSpotifyAuth
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
