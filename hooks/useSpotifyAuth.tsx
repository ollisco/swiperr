import React, { createContext, useContext, useState } from 'react';
import { useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { CLIENT_ID, CLIENT_SECRET } from '@env';
import axios from 'axios';
import { countries } from 'country-data';
import useAutoExchange from './useAutoExchange';
import {
  discovery, redirectUri, meEndpoint, recomendationEndpoint,
} from './utils/auth-utils';

WebBrowser.maybeCompleteAuthSession();

function getLocation(countryCode: string) {
  const country = countries[countryCode].name;
  return country;
}

function getCounryCode(contryName: string) {
  const countryCode = countries[contryName].alpha2;
  return countryCode;
}

// TODO: Remove any
const SpotifyAuthContext: React.Context<{
  promptAsync: any
  token: any,
  user: any,
  recommendedTracks: any,
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
  topGenres: string,
  topArtists: string,
  topTracks: string,
  setDefaultPlaylist: any,
  availableMarkets: any,
  setChosenMarket: any,
  chosenMarket: any,

}> = createContext({
  promptAsync: null,
  token: null,
  user: null,
  recommendedTracks: null,
  getRecommendedTracks: null,
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
  topGenres: '',
  topArtists: '',
  topTracks: '',
  setDefaultPlaylist: null,
  availableMarkets: null,
  setChosenMarket: null,
  chosenMarket: null,
});

WebBrowser.maybeCompleteAuthSession();

interface Props {
  children: React.ReactNode
}

export const SpotifyAuthProvider: React.ReactNode = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [recommendedTracks, setRecommendedTracks] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState(null);
  const [newReleases, setNewReleases] = useState<any[] | null>(null);
  const [topGenres, setTopGenres] = useState<string>('Genre 1, Genre 2, Genre 3');
  const [topArtists, setTopArtists] = useState<string>('Artist 1, Artist 2, Artist 3');
  const [topTracks, setTopTracks] = useState<string>('Track 1, Track 2, Track 3');
  const [availableMarkets, setAvailableMarkets] = useState(null);
  const [chosenMarket, setChosenMarket] = useState<string | null>(null);
  const likeSongString = 'Liked songs';
  const [defaultPlaylist, setDefaultPlaylist] = useState<string>(likeSongString); // Either equal to liked songs or a playlist uri
  const [config, setConfig] = useState<any>(null);


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

  const songCount = 20; // has to be 20 due to /albums/{ids} can only have 20 ids

  // Token will be auto exchanged after auth completes.
  const { token, tokenExchangeError: exchangeError } = useAutoExchange(
    response?.type === 'success' ? response.params.code : undefined,
  );

  async function getNewReleases() {
    const r = Math.floor(Math.random() * 100);
    const market = chosenMarket || 'US';
    await axios.get(`https://api.spotify.com/v1/browse/new-releases?limit=${songCount}&country=${chosenMarket}&offset${r}`, config)
      .then((res) => {
        const albumUris: string[] = [];
        res.data.albums.items.forEach((item: any) => {
          albumUris.push(item.id);
        });
        albumUris.sort(() => 0.5 - Math.random());
        const reducedAlbumUris = albumUris.slice(0, 20);

        const albumUriString = reducedAlbumUris.join();
        const releases: any[] = [];
        axios.get(`https://api.spotify.com/v1/albums?ids=${albumUriString}`, config)
          .then((res) => {
            console.log('New releases in', getLocation(market), res.data);
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

  async function getPlaylists() {
    await axios.get(`https://api.spotify.com/v1/me/playlists?limit=${50}`, config)
      .then((res) => {
        // Todo improve this to filter on user id aswell
        const playlists = res.data.items.filter((playlist: any) => playlist.owner.display_name !== 'Spotify');

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

  async function addTrackToPlaylist(playlistId: string, trackId: string) {
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

  async function getAvailibleMarkets() {
    await axios.get('https://api.spotify.com/v1/markets', config)
      .then((res) => {
        const countryCodes = res.data.markets;
        // map each country code to its country name
        const countries = countryCodes.map((countryCode: string) => ({
          code: countryCode,
          name: getLocation(countryCode),
        }));
        console.log(countries);
        setAvailableMarkets(countries);
      })
      .catch((err) => {
        console.log('Error getting availible markets: ', err);
      });
  }

  async function playerInfo() {
    // config
    if (token) {
      await axios.get('https://api.spotify.com/v1/me/player/devices', config)
        .then((res) => {
          // console.log('Device:', res);
        }).catch((err) => {
          console.log('Device Error:', err);
        });
    }
  }

  async function likeSong(trackId: string) {
    // config

    if (defaultPlaylist === likeSongString) {
      await axios.put(
        'https://api.spotify.com/v1/me/tracks',
        // send trackid as "ids" parameter
        { ids: [trackId] },
        config,
      ).then((res) => {
        // console.log('Saved track to user library');
        getLikedSongs();
      }).catch((err) => {
        console.log(err);
      });
    } else {
      console.log(defaultPlaylist, trackId);
      const trackUri = `spotify:track:${trackId}`;
      addTrackToPlaylist(defaultPlaylist, trackUri);
    }
  }

  async function getUserData() {
    return axios.get(meEndpoint, config)
      .then((res) => {
        console.log('User data: ', res.data);
        setUser(res.data);
        setChosenMarket(res.data.country);
      })
      .catch((res) => console.log('E1: ', res));
  }

  async function getTopUserItems() {
    const allArtists: any = [];
    const allTracks: any = [];
    const availableGenres: any = [];
    const otherGenres: any = [];
    const allGenres: any = [];
    const genres: any = [];
    const artist: any = [];
    const tracks: any = [];

    const topTracksText: any = [];
    const topArtistsText: any = [];

    const count = 5;

    await axios.get(`${meEndpoint}/top/tracks`, config)
      .then((res) => {
        // setUserTopItems(res.data);
        for (let i = 0; i < res.data.items.length; i += 1) {
          allTracks.push(res.data.items[i].id);
          topTracksText.push(res.data.items[i].name);
        }
      })
      .catch((res) => console.log('E2: ', res));

    await axios.get(`${recomendationEndpoint}/available-genre-seeds`, config)
      .then((res: any) => {
        // loop over the genres and add them to the available genres
        res.data.genres.forEach((genre: any) => {
          availableGenres.push(genre);
        });
      })
      .catch((res) => console.log('E3: ', res));

    await axios.get(`${meEndpoint}/top/artists`, config)
      .then((res) => {
        for (let i = 0; i < res.data.items.length; i += 1) {
          allArtists.push(res.data.items[i].id);
          topArtistsText.push(res.data.items[i].name);
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

    // Copy the config add modyfy it.
    // setting config2 = config and updating config2 also updates config
    const configRecommendations = { ...config };
    configRecommendations.params = {
      seed_artists: seedArtists,
      seed_genres: seedGenres,
      seed_tracks: seedTracks,
      limit: songCount,
    };

    await axios.get(recomendationEndpoint, configRecommendations)
      .then((res) => {
        // console.log('Recomendations: ', res.data);
        const { tracks } = res.data;
        setRecommendedTracks(tracks);
        const firstTrackUri = tracks[0].uri;
        queueSongAndSkip(firstTrackUri);
      })
      .catch((res) => console.log('Erec: ', res));

    const n = 10;
    topArtistsText.sort(() => 0.5 - Math.random());
    topTracksText.sort(() => 0.5 - Math.random());
    const both = allGenres.concat(otherGenres);
    both.sort(() => 0.5 - Math.random());
    setTopArtists(topArtistsText.slice(0, n).sort().join(', '));
    setTopTracks(topTracksText.slice(0, n).sort().join(', '));
    setTopGenres(both.slice(0, n).sort().join(', '));
    setVolume(50);
  }


  async function getLikedSongs() {
    await axios.get(`${meEndpoint}/tracks`, config)
      .then((res) => {
        const tracks = res.data.items;
        setLikedSongs(tracks);
      })
      .catch((res) => console.log('E4: ', res));
  }

  async function pause() {
    await axios.put('https://api.spotify.com/v1/me/player/pause', null, config)
      .then((res) => {
        // console.log('Paused');
        setIsPlaying(false);
      })
      .catch((res) => console.log('Error Pausing: ', res));
  }

  async function setVolume(volume: number) {
    await axios.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, null, config)
      .then((res) => {
        console.log('Volume Set to: ', volume);
      })
      .catch((res) => console.log('Error Setting Volume: ', res));
  }

  async function play() {
    await axios.put('https://api.spotify.com/v1/me/player/play', null, config)
      .then((res) => {
        // console.log('Playing');
        setIsPlaying(true);
      })
      .catch((res) => console.log('Error Playing: ', res));
  }

  async function queueSongAndSkip(trackUri: string) {
    // TODO: Figure out how to send the query nicely with axios
    axios.post(
      `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`,
      {},
      config,
    ).then(() => {
      playNextSong();
    }).catch((err) => console.log('Error Queue: ', err));
  }

  async function playNextSong() {
    axios.post(
      'https://api.spotify.com/v1/me/player/next',
      {},
      config,
    ).catch((err) => console.log('Error Next: ', err));

    setIsPlaying(true);
  }

  function switchPlayingState() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  React.useEffect(() => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      };
      setConfig(config);
    }
  }, [token]);

  React.useEffect(() => {
    if (config && token) {
      getUserData();
      getTopUserItems();
      getLikedSongs();
      getPlaylists();
      getAvailibleMarkets();
    }
  }, [config, token]);

  React.useEffect(() => {
    if (chosenMarket) {
      getNewReleases();
    }
  }, [chosenMarket]);
  return (
    <SpotifyAuthContext.Provider
      value={{
        promptAsync,
        token,
        user,
        recommendedTracks,
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
        topTracks,
        topArtists,
        topGenres,
        setDefaultPlaylist,
        availableMarkets,
        setChosenMarket,
        chosenMarket,
      }}
    >
      {children}
    </SpotifyAuthContext.Provider>
  );
};

export default function useSpotifyContext() {
  return useContext(SpotifyAuthContext);
}
