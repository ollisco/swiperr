import React, { createContext, useContext, useState } from 'react';
import { useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import axios from 'axios';
import useAutoExchange from './useAutoExchange';
import {
  discovery, redirectUri, meEndpoint, recomendationEndpoint,
} from './utils/auth-utils';

const BG_IMAGE = require('../assets/images/bg2.jpg');

WebBrowser.maybeCompleteAuthSession();

// TODO: Remove any
const SpotifyAuthContext: React.Context<{
  promptAsync: any
  token: any,
  user: any,
  userTopItems: any,
  bg: any,
}> = createContext({
  promptAsync: null,
  token: null,
  user: null,
  userTopItems: null,
  bg: null,
});

WebBrowser.maybeCompleteAuthSession();

export const SpotifyAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userTopItems, setUserTopItems] = useState(null);
  const [bg, setBg] = useState(BG_IMAGE);
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
    const allArtists: any = [];
    const allTracks: any = [];
    const availableGenres: any = [];
    const otherGenres: any = [];
    const allGenres: any = [];
    const genres: any = [];
    const artist: any = [];
    const tracks: any = [];

    const count = 5;

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios.get(`${recomendationEndpoint}/available-genre-seeds`, config)
      .then((res: any) => {
        // loop over the genres and add them to the available genres
        res.data.genres.forEach((genre: any) => {
          availableGenres.push(genre);
        });
      })
      .catch((res) => console.log('E3: ', res));

    await axios.get(`${meEndpoint}/top/tracks`, config)
      .then((res) => {
        // setUserTopItems(res.data);
        for (let i = 0; i < count; i++) {
          allTracks.push(res.data.items[i].id);
        }
      })
      .catch((res) => console.log('E2: ', res));

    await axios.get(`${meEndpoint}/top/artists`, config)
      .then((res) => {
        for (let i = 0; i < count; i++) {
          allArtists.push(res.data.items[i].id);
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
        });
      })
      .catch((res) => console.log('E: ', res));

    // Get 1 random items in allGenres and place them in genres
    for (let i = 0; i < 1; i++) {
      const randomIndex = Math.floor(Math.random() * allGenres.length);
      genres.push(allGenres[randomIndex]);
    }

    // Get two random items from allTracks and place them in tracks
    for (let i = 0; i < 2; i++) {
      if (allTracks.length !== 0) {
        const random = Math.floor(Math.random() * allTracks.length);
        const selectedTrack = allTracks[random];
        tracks.push(selectedTrack);
        allTracks.splice(random, 1); // remove selectedTrack from allTracks
      }
    }

    // Get two random items from allArtists and place them in artists
    for (let i = 0; i < 2; i++) {
      if (allArtists.length !== 0) {
        const random = Math.floor(Math.random() * allArtists.length);
        const selectedArtist = allArtists[random];
        artist.push(selectedArtist);
        allArtists.splice(random, 1); // remove selectedArtist from allArtists
      }
    }

    // WARNING: the length of seed genres + seed artists + seed tracks <= 5 (MAX 5)
    const seed_genres = genres[0];
    const seed_artists = `${allArtists[0]},${allArtists[1]}`;
    const seed_tracks = `${allTracks[0]},${allTracks[1]}`;

    const config2 = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        seed_artists,
        seed_genres,
        seed_tracks,
      },
    };

    console.log(config2);
    await axios.get(recomendationEndpoint, config2)
      .then((res) => {
        console.log('Recomendations: ', res.data);
        setUserTopItems(res.data.tracks);
      })
      .catch((res) => console.log('E: ', res));

    setBg(require('../assets/images/bg2.jpg'));
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
        bg: BG_IMAGE,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export default function useSpotifyAuth() {
  return useContext(SpotifyAuthContext);
}
