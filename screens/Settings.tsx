import {
  View, ImageBackground,
} from 'react-native';
import React from 'react';
import styles from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';
import { SettingItemSwitch } from '../components';
import SettingItemDropdown from '../components/SettingItemDropdown';
import useSpotifyContext from '../hooks/useSpotifyAuth';

function MockSettingItems() {
  return (
    <View>
      <SettingItemSwitch
        text="Setting number 1"
        onPress={() => {}}
        value
      />
      <SettingItemSwitch
            // lorem ipsum
        text="Setting number 2 lorem ipsum lipsum"
        onPress={() => {}}
        value
      />

      <SettingItemDropdown
        header="Header"
        explanation="Explanation and showing how large this text should be"
        options={['Option 1', 'Option 2', 'Option 3']}
      />
    </View>
  );
}

function SettingItems() {
  const { playlists, setDefaultPlaylist } = useSpotifyContext();

  const likedSongs = 'Liked Songs';

  function getDefaultPlaylist(playlistName: string) {
    const playlist = playlists.find((playlist: { name: string; }) => playlist.name === playlistName);
    setDefaultPlaylist(playlist.id);
  }

  return (
    <View>
      <SettingItemSwitch
        text="Setting number 1"
        onPress={() => {}}
        value
      />
      <SettingItemSwitch
            // lorem ipsum
        text="Setting number 2 lorem ipsum lipsum"
        onPress={() => {}}
        value
      />

      <SettingItemDropdown
        header="Default Playlist"
        explanation="The default playlist where right swiped cards apear. Please only choose playlists that you own or can add music to."
        options={[likedSongs, ...playlists.map((playlist: { name: string; }) => playlist.name)]}
        defaultValue={likedSongs}
        onSelect={(value: any) => getDefaultPlaylist(value)}
      />
    </View>
  );
}

function Settings() {
  return (
    <View>
      <ImageBackground
        source={BG_IMAGE}
        style={styles.bg}
      >
        {/* <MockSettingItems /> */}
        <SettingItems />
      </ImageBackground>
    </View>
  );
}

export default Settings;
