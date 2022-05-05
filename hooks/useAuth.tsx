import React, { createContext, useContext, useState } from 'react';
import { useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import axios from 'axios';
import useAutoExchange from './useAutoExchange';
import {
  discovery, redirectUri, meEndpoint, recomendationEndpoint,
} from './utils/auth-utils';

WebBrowser.maybeCompleteAuthSession();

// TODO: Remove any
const SpotifyAuthContext: React.Context<{
  promptAsync: any
  token: any,
  user: any,
  userTopItems: any,
  getTopUserItems: any,
  likeSong: any,
  info: any,
}> = createContext({
  promptAsync: null,
  token: null,
  user: null,
  userTopItems: null,
  getTopUserItems: null,
  likeSong: null,
  info: null
});

WebBrowser.maybeCompleteAuthSession();

export const SpotifyAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userTopItems, setUserTopItems] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [request, response, promptAsync] = useAuthRequest({
    clientId: CLIENT_ID,
    scopes: ['user-read-email', 'user-read-private', 'user-top-read', 'user-library-read',
      'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state',
    'app-remote-control'],
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

  async function playerInfo() {
    // config
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      };
      await axios.get('https://api.spotify.com/v1/me/player/devices', config)
        .then((res) => {
          console.log('Device:', res);
        }).catch((err) => {
          console.log('Device Error:', err);
        });
        

    }
  }

  async function likeSong(accessToken: string, trackUri: string) {
    // config
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      };
      await axios.put(
        'https://api.spotify.com/v1/me/tracks',
        // send trackid as "ids" parameter
        { ids: [trackUri] },
        config,
      ).then((res) => {
        console.log('Saved track to user library');
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  async function getUserData(accessToken: string) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    await axios.get(meEndpoint, config)
      .then((res) => {
        setUser(res.data);
        getUserPlaylists(accessToken, res.data.id);
      })
      .catch((res) => console.log('E1: ', res));
  }

  async function getUserPlaylists(accessToken: string, userid: string) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    const uri = 'https://api.spotify.com/v1/users/me/tracks?limit=50';
    await axios.get(uri, config)
      .then((res) => {
        setUserPlaylists(res.data);
      })
      .catch((res) => console.log('E7: ', res));
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
        for (let i = 0; i < res.data.items.length; i += 1) {
          allTracks.push(res.data.items[i].id);
        }
      })
      .catch((res) => console.log('E2: ', res));

    await axios.get(`${meEndpoint}/top/artists`, config)
      .then((res) => {
        for (let i = 0; i < res.data.items.length; i += 1) {
          allArtists.push(res.data.items[i].id);
        }
        res.data.items.forEach((item: any) => {
        // loop over the genres and push them to genres
          for (let i = 0; i < item.genres.length; i += 1) {
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
    for (let i = 0; i < 1; i += 1) {
      const randomIndex = Math.floor(Math.random() * allGenres.length);
      genres.push(allGenres[randomIndex]);
    }

    // Get two random items from allTracks and place them in tracks
    for (let i = 0; i < 2; i += 1) {
      if (allTracks.length !== 0) {
        const random = Math.floor(Math.random() * allTracks.length);
        const selectedTrack = allTracks[random];
        tracks.push(selectedTrack);
        allTracks.splice(random, 1); // remove selectedTrack from allTracks
      }
    }

    // Get two random items from allArtists and place them in artists
    for (let i = 0; i < 2; i += 1) {
      if (allArtists.length !== 0) {
        const random = Math.floor(Math.random() * allArtists.length);
        const selectedArtist = allArtists[random];
        artist.push(selectedArtist);
        allArtists.splice(random, 1); // remove selectedArtist from allArtists
      }
    }

    // WARNING: the length of seed genres + seed artists + seed tracks <= 5 (MAX 5)
    const seedGenres = genres[0];
    const seedArtists = `${allArtists[0]},${allArtists[1]}`;
    const seedTracks = `${allTracks[0]},${allTracks[1]}`;

    const config2 = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        seed_artists: seedArtists,
        seed_genres: seedGenres,
        seed_tracks: seedTracks,
      },
    };


    await axios.get(recomendationEndpoint, config2)
      .then((res) => {
        console.log('Recomendations: ', res.data);
        const { tracks } = res.data;
        // get a slice of the first 5 tracks
        // const slicedTracks = tracks.slice(0, 5);
        setUserTopItems(tracks);
        const firstTrackUri = tracks[0]['uri'];
        //const firstTrackUri = 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh';
        console.log('uri: ', firstTrackUri);

        
        const q = {
          data: {'uuh': 'uuh'},
          query: {
            uri: firstTrackUri,
          }
        }

        // TODO: Figure out how to send the query nicely with axios
        axios.post(
          `https://api.spotify.com/v1/me/player/queue?uri=${firstTrackUri}`,
          {},
          config,
        ).then((res) => {
          console.log(res)
          axios.post(
            `https://api.spotify.com/v1/me/player/next`,
            {},
            config,
          ).then((res) => {
            console.log(res)
          }).catch((err) => console.log('Error Next: ', err));
        }).catch((err) => console.log('Error Queue: ', err));

        

      })
      .catch((res) => console.log('Erec: ', res));
    
  }

  React.useEffect(() => {
    if (token) {
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
        getTopUserItems,
        likeSong,
        info: playerInfo,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export default function useSpotifyContext() {
  return useContext(SpotifyAuthContext);
}
