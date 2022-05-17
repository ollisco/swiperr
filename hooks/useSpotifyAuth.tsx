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
  userRecommendedTracks: any,
  getUserRecommendedTracks: any,
  likeSong: any,
  info: any,
  queueAndSkip: any,
  isPlaying: any,
  setIsPlaying: any,
  switchPlayingState: any,
  setVolume: any,
  likedSongs: any,
  getLikedSongs: any,
  getPlaylists: any,
  playlists: any,
  addTrackToPlaylist: any,
  newReleases: any,

}> = createContext({
  promptAsync: null,
  token: null,
  user: null,
  userRecommendedTracks: null,
  getUserRecommendedTracks: null,
  likeSong: null,
  info: null,
  queueAndSkip: null,
  isPlaying: null,
  setIsPlaying: null,
  switchPlayingState: null,
  setVolume: null,
  likedSongs: null,
  getLikedSongs: null,
  getPlaylists: null,
  playlists: null,
  addTrackToPlaylist: null,
  newReleases: null,
});

WebBrowser.maybeCompleteAuthSession();

export const SpotifyAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRecommendedTracks, setUserRecommendedTracks] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState(null);
  const [showRecommended, setShowRecommended] = useState(true);
  const [newReleases, setNewReleases] = useState(null);

  const [request, response, promptAsync] = useAuthRequest({
    clientId: CLIENT_ID,
    scopes: ['user-read-email', 'user-read-private', 'user-top-read', 'user-library-read',
      'user-library-modify', 'playlist-read-private', 'playlist-read-collaborative',
      'user-read-playback-state', 'user-modify-playback-state',
      'app-remote-control', 'playlist-modify-private', 'playlist-modify-public',
    ],
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

  async function switchCardtypeState(accessToken: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  async function getNewReleases(accessToken: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const r = Math.floor(Math.random() * 100);
    await axios.get(`https://api.spotify.com/v1/browse/new-releases?limit=50&country=SE&offset${r}`, config)
      .then((res) => {
        const albumUris: string[] = [];
        res.data.albums.items.forEach((item: any) => {
          albumUris.push(item.id);
        });
        // shuffle albumUris
        albumUris.sort(() => 0.5 - Math.random());
        // get first 20 albums
        const reducedAlbumUris = albumUris.slice(0, 20);
      
        const albumUriString = reducedAlbumUris.join();
        const releases: any[] = [];
        axios.get(`https://api.spotify.com/v1/albums?ids=${albumUriString}`, config)
          .then((res) => {
            console.log('A', res.data);
            res.data.albums.forEach((album: any) => {
              const randomInt = Math.floor(Math.random() * album.tracks.items.length);
              const item = album.tracks.items[randomInt];
              item.images = album.images;
              item.releaseDate = album.release_date;
              item.id = album.tracks.items[randomInt].uri.split(':')[2]; // WATNING SHAKY
              releases.push(item);
            });
            releases.sort(() => Math.random() - 0.5);

            setNewReleases(releases);
          })
          .catch((err) => {
            console.log(err);
          });
        
        // shuffle the releases array

        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function switchPlayingState(accessToken: string) {
    if (isPlaying) {
      pause(accessToken);
    } else {
      play(accessToken);
    }
  }

  async function getAlbums(accessToken: string, albumId: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios.get('https://api.spotify.com/v1/browse/new-releases', config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getPlaylists(accessToken: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${50}`, config)
      .then((res) => {
        // Todo improve this to filter on user id aswell
        const playlists = res.data.items.filter((playlist: any) => playlist.owner.display_name !== 'Spotify');

        // sort playlists alphabetically
        playlists.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        // console.log('Playlists: ', playlists);
        setUserPlaylists(playlists);
      })
      .catch((err) => {
        console.log('Error Playlist: ', err);
      });
  }

  async function addTrackToPlaylist(accessToken: string, playlistId: string, trackId: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    // console.log('OOO', accessToken, playlistId, trackId);
    // If this is set to .put instead of .post it will erase the whole playlist
    // Soooo... dont do that
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackId}`, {}, config)
      .then((res) => {
        console.log('Added track to playlist: ', res.data);
      })
      .catch((err) => {
        console.log('Error adding track to playlist: ', err);
      });
  }

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
          // console.log('Device:', res);
        }).catch((err) => {
          console.log('Device Error:', err);
        });
    }
  }

  async function likeSong(accessToken: string, trackUri: string) {
    // config
    if (accessToken) {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await axios.put(
        'https://api.spotify.com/v1/me/tracks',
        // send trackid as "ids" parameter
        { ids: [trackUri] },
        config,
      ).then((res) => {
        // console.log('Saved track to user library');
        getLikedSongs(accessToken, 20);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function getUserData(accessToken: string) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    let u = null;
    axios.get(meEndpoint, config)
      .then((res) => {
        setUser(res.data);
        u = res.data;
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
    const seedArtists = allArtists[1] ? `${allArtists[0]},${allArtists[1]}` : '';
    const seedTracks = allTracks[1] ? `${allTracks[0]},${allTracks[1]}` : '';

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
        // console.log('Recomendations: ', res.data);
        const { tracks } = res.data;
        setUserRecommendedTracks(tracks);
        const firstTrackUri = tracks[0].uri;
        queueSongAndSkip(accessToken, firstTrackUri);
      })
      .catch((res) => console.log('Erec: ', res));

    setVolume(accessToken, 50);
  }

  function nextCardSong(accessToken: string) {
    // make sure userTopItems is not null
    if (userRecommendedTracks !== null) {
      const trackUri = userRecommendedTracks[index].uri;
      queueSongAndSkip(accessToken, trackUri);
    }
  }

  async function getLikedSongs(accessToken: string, count: number) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    await axios.get(`${meEndpoint}/tracks`, config)
      .then((res) => {
        const tracks = res.data.items;
        setLikedSongs(tracks);
      })
      .catch((res) => console.log('E4: ', res));
  }

  async function pause(accessToken: string) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    await axios.put('https://api.spotify.com/v1/me/player/pause', null, config)
      .then((res) => {
        // console.log('Paused');
        setIsPlaying(false);
      })
      .catch((res) => console.log('Error Pausing: ', res));
  }

  async function setVolume(accessToken: string, volume: number) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    await axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, null, config)
      .then((res) => {
        console.log('Volume Set to: ', volume);
      })
      .catch((res) => console.log('Error Setting Volume: ', res));
  }

  async function play(accessToken: string) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    await axios.put('https://api.spotify.com/v1/me/player/play', null, config)
      .then((res) => {
        // console.log('Playing');
        setIsPlaying(true);
      })
      .catch((res) => console.log('Error Playing: ', res));
  }

  async function queueSongAndSkip(accessToken: string, trackUri: string) {
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };
    // TODO: Figure out how to send the query nicely with axios
    axios.post(
      `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`,
      {},
      config,
    ).then(() => {
      playNextSong(accessToken);
    }).catch((err) => console.log('Error Queue: ', err));
  }

  async function playNextSong(accessToken: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios.post(
      'https://api.spotify.com/v1/me/player/next',
      {},
      config,
    ).catch((err) => console.log('Error Next: ', err));

    setIsPlaying(true);
  }

  React.useEffect(() => {
    if (token) {
      getUserData(token.accessToken);
      getTopUserItems(token.accessToken);
      getLikedSongs(token.accessToken, 10);

      getPlaylists(token.accessToken);
      getNewReleases(token.accessToken);
    }
  }, [token]);

  return (
    <SpotifyAuthContext.Provider
      value={{
        promptAsync,
        token,
        user,
        userRecommendedTracks,
        getUserRecommendedTracks: getTopUserItems,
        likeSong,
        info: playerInfo,
        queueAndSkip: queueSongAndSkip,
        isPlaying,
        setIsPlaying,
        switchPlayingState,
        setVolume,
        likedSongs,
        getLikedSongs,
        getPlaylists: () => {},
        playlists: userPlaylists,
        addTrackToPlaylist,
        newReleases,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export default function useSpotifyContext() {
  return useContext(SpotifyAuthContext);
}
