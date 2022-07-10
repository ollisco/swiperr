import {
  View, ImageBackground, Text,
} from 'react-native';
import React, { useState } from 'react';
import styles from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';
import { SettingItemSwitch } from '../components';
import SettingItemDropdown from '../components/SettingItemDropdown';
import useSpotifyContext from '../hooks/useSpotifyAuth';
import { getLocation } from '../components/utils/country-utils';
import { mobileRedirectUri, redirectUri, webRedirectUri } from '../hooks/utils/auth-utils';
import { dropdownSize } from '../types';

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

      <SettingItemDropdown
        header="Debug info"
        explanation="This is debug info for development resons. If you are testing you can ignore this dropdown."
        options={[redirectUri, webRedirectUri, mobileRedirectUri]}
        dropdownSize={dropdownSize.MEDIUM}
      />

    </View>
  );
}

function SettingItems() {
  const {
    playlists, 
    setDefaultPlaylist, 
    availableMarkets, 
    chosenMarket, 
    setChosenMarket, 
    queueAndSkip
  } = useSpotifyContext();

  const likedSongs = 'Liked songs';
  function getDefaultPlaylist(playlistName: string) {
    if (playlistName === likedSongs) {
      setDefaultPlaylist(likedSongs);
      return;
    }
    const playlist = playlists.find((playlist: { name: string; }) => playlist.name === playlistName);
    setDefaultPlaylist(playlist.id);
  }

  return (
    <View>
      <SettingItemDropdown
        header="Country"
        explanation="Music will be adapted to the given country. New releases will be based on the country you choose."
        defaultValue={getLocation(chosenMarket) || ''}
        dropdownSize={dropdownSize.LARGE}
        options={availableMarkets.map((
          country: {
            code: string,
            name: string, 
            nameWithFlag: string
          }     
        ) => country.nameWithFlag
        )}
        onSelect={(value: string) => {
          setChosenMarket(availableMarkets.find((country: {nameWithFlag: string}) => country.nameWithFlag === value).code);
        }}
      />

      <SettingItemDropdown
        header="Default Playlist"
        explanation="The default playlist where right swiped cards apear. Please only choose playlists that you own or can add music to."
        options={[likedSongs, ...playlists.map((playlist: { name: string; }) => playlist.name)]}
        defaultValue={likedSongs}
        dropdownSize={dropdownSize.MEDIUM}
        onSelect={(value: string) => getDefaultPlaylist(value)}
      />
    </View>
  );
}

function Settings() {
  const { playlists, availableMarkets } = useSpotifyContext();
  return (
    <View>

      <ImageBackground
        source={BG_IMAGE}
        style={styles.bg}
      >
        <View style={styles.top}>
          <Text style={styles.title}>Settings</Text>
        </View>
        {playlists && playlists.length > 0 && availableMarkets && availableMarkets.length > 0
          ? <SettingItems />
          : <MockSettingItems />}
      </ImageBackground>
    </View>
  );
}

export default Settings;
