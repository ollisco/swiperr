import React, { createContext, useContext, useState } from 'react';
import {
  useAuthRequest, AccessTokenRequest, TokenResponse, exchangeCodeAsync,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import axios from 'axios';
import useAutoExchange from './useAutoExchange';
import { discovery, redirectUri, meEndpoint, recomendationEndpoint } from './utils/auth-utils';
import DEMO from '../assets/data/dummy_data_songs';

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
    scopes: ['user-read-email', 'user-read-private', 'user-top-read'],
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
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    await axios.get(meEndpoint, config)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((res) => console.log('E1: ', res));
  }

  async function getTopUserItems(accessToken: string) {
    let artists: any = [];
    let tracks: any = [];
    let availableGenres: any = [];
    let otherGenres: any = [];
    let allGenres: any = [];
    let genres: any = [];
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    };

    await axios.get(`${recomendationEndpoint}/available-genre-seeds`, config)
      .then((res: any) => {
        console.log(res);
        // loop over the genres and add them to the available genres
        res.data.genres.forEach((genre: any) => {
          availableGenres.push(genre);
        });
      })
      .catch((res) => console.log('E3: ', res));


    await axios.get(`${meEndpoint}/top/tracks`, config)
      .then((res) => {
        console.log(res);
        //setUserTopItems(res.data);
        for (let i = 0; i < 5; i++) {
          tracks.push(res.data.items[i].id);
        }

      })
      .catch((res) => console.log('E2: ', res));
    
    await axios.get(`${meEndpoint}/top/artists`, config)
    .then((res) => {
      console.log(res);
      //setUserTopItems(res.data);
      for (let i = 0; i < 5; i++) {
        artists.push(res.data.items[i].id);
      }
      res.data.items.forEach((item: any) => {
        // loop over the genres and push them to genres
        for (let i = 0; i < item.genres.length; i++) {
          const genre = item.genres[i];
          if (availableGenres.includes(genre) && !allGenres.includes(genre)) {
            allGenres.push(genre);
          } else {
            otherGenres.push(genre);
          }
        }
      })
      
    })
    .catch((res) => console.log('E: ', res));

    // Get 5 random items in allGenres and place them in genres
    for (let i = 0; i < 5; i++) {
      if (allGenres.length !== 0) {
        let random = Math.floor(Math.random() * allGenres.length);
        const selectedGenre = allGenres[random];
        genres.push(selectedGenre);
        allGenres.splice(random, 1);  // remove selectedGenre from allGenres
      }
    }
    // const seed_genres = genres.join();
    // const seed_artists =  artists.join();
    // const seed_tracks = tracks.join();

    const seed_genres = genres[0];
    const seed_artists = artists[0];
    const seed_tracks = tracks[0];


    const config2 = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        seed_artists,
        seed_genres,
        seed_tracks,    
      }
    };

    // console.log(availableGenres);
    // console.log(otherGenres);
    // console.log(allGenres);
    // console.log(genres);
    // console.log(seed_genres, seed_artists, seed_tracks);

    await axios.get(recomendationEndpoint, config2)
      .then((res) => {
        console.log('R', res.data);
        console.log('R2', res.data.tracks);
        setUserTopItems(res.data.tracks);
        //setUserTopItems(res.data);
      })
      .catch((res) => console.log('E: ', res));


  }

  React.useEffect(() => {
    if (token) {
      console.log('My Token:', token);

      getUserData(token.accessToken);
      getTopUserItems(token.accessToken);
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
