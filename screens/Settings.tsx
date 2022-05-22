import {
  View, ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import styles from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';
import { SettingItemSwitch } from '../components';
import SettingItemDropdown from '../components/SettingItemDropdown';
import useSpotifyContext from '../hooks/useSpotifyAuth';

function MockSettingItems() {
  const [exampleBool, setExampleBool] = useState(false);
  return (
    <View>
      <SettingItemDropdown
        header="Country"
        explanation="Music will be adapted to the given country. New releases will be based on the country you choose."
        defaultValue={'SE' || ''}
        options={['SE', 'US', 'GB', 'CA']}
      />

      <SettingItemDropdown
        header="Default Playlist"
        explanation="The default playlist where right swiped cards apear. Please only choose playlists that you own or can add music to."
        options={['Playlist 1', 'Playlist 2', 'Playlist 3']}
      />

      <SettingItemSwitch
        text="An example Switch"
        value={exampleBool}
        onValueChange={() => setExampleBool(!exampleBool)}

      />

    </View>
  );
}

function SettingItems() {
  const {
    playlists, setDefaultPlaylist, availableMarkets, chosenMarket, setChosenMarket,
  } = useSpotifyContext();

  const likedSongs = 'Liked Songs';

  function getDefaultPlaylist(playlistName: string) {
    const playlist = playlists.find((playlist: { name: string; }) => playlist.name === playlistName);
    setDefaultPlaylist(playlist.id);
  }

  return (
    <View>
      <SettingItemDropdown
        header="Country"
        explanation="Music will be adapted to the given country. New releases will be based on the country you choose."
        defaultValue={chosenMarket || ''}
        options={availableMarkets.map((country: {code: string; name: string}) => country.name)}
        onSelect={(value: string) => {
          // this is uneffective should probably make getLocation ad getCountrycode public
          setChosenMarket(availableMarkets.find((country: {name: string}) => country.name === value).code);
        }}
      />

      <SettingItemDropdown
        header="Default Playlist"
        explanation="The default playlist where right swiped cards apear. Please only choose playlists that you own or can add music to."
        options={[likedSongs, ...playlists.map((playlist: { name: string; }) => playlist.name)]}
        defaultValue={likedSongs}
        onSelect={(value: string) => getDefaultPlaylist(value)}
      />
    </View>
  );
}

function Settings() {
  const { user } = useSpotifyContext();
  return (
    <View>
      <ImageBackground
        source={BG_IMAGE}
        style={styles.bg}
      >
        {user
          ? <SettingItems />
          : <MockSettingItems />}
      </ImageBackground>
    </View>
  );
}

export default Settings;
