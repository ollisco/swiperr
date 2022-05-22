import React from 'react';
import {
  View, ImageBackground,
} from 'react-native';
import { Playlists, Cards } from '../components';
import styles from '../assets/styles';
import SwipeCardProvider from '../components/card-components/CardProvider';
import useSpotifyContext from '../hooks/useSpotifyAuth';

function Explore() {
  const backgroundLink = 'https://ollisco.se/assets/bg2.jpg'; // To avoid bg dissapearing after API call
  const { user, playlists, addTrackToPlaylist } = useSpotifyContext();


  return (
    <View>
      <ImageBackground
        source={{ uri: backgroundLink }} // To avoid bg dissapearing after API call
        style={styles.bg}
        resizeMode="cover"
      >
        <SwipeCardProvider>
          <Cards />
          <Playlists />
        </SwipeCardProvider>
      </ImageBackground>
    </View>
  );
}

export default Explore;
