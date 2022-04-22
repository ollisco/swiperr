/* eslint-disable no-unused-vars */

import { Platform } from "react-native";

// TODO: can maybe be replaced with: getRedirectUrl from expo auth session
const phoneRedirectUri = 'exp://localhost:19000/';
const webRedirectUri = 'http://localhost:19006/';
const redirectUri = Platform.OS === 'web' ? webRedirectUri : phoneRedirectUri;
/* eslint-enable no-unused-vars */

const discovery = {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export { redirectUri, discovery}