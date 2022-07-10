import { Platform } from 'react-native';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import { makeRedirectUri } from 'expo-auth-session';

// TODO: can maybe be replaced with: getRedirectUrl from expo auth session


console.log(CLIENT_ID, CLIENT_SECRET);
//const redirectUri = Platform.OS === 'web' ? REDIRECT_URI_WEB : REDIRECT_URI;
const webRedirectUri = makeRedirectUri({scheme: 'swiperr', path: 'swiperr'}) ;
const mobileRedirectUri = makeRedirectUri({scheme: 'swiperr'}) ;

const redirectUri = Platform.OS === "web" 
  ? webRedirectUri
  : mobileRedirectUri;  

console.log(redirectUri, CLIENT_ID !== undefined, CLIENT_SECRET !== undefined);
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
  redirectUri, webRedirectUri, mobileRedirectUri, discovery, meEndpoint, recomendationEndpoint,
};
