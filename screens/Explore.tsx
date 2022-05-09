import React from 'react';
import {
  View, ImageBackground, Text, FlatList, TouchableOpacity, ScrollView,
} from 'react-native';
import {
  Settings, Filters, Login, CardItemRow, Playlists, Cards,
} from '../components';
import styles from '../assets/styles';
import SwipeCardProvider from '../components/SwipeCardProvider';
import CardStackHandler from '../components/CardStackHandler';
import useSpotifyContext from '../hooks/useAuth';
import CardItemSmall from '../components/CardItemSmall';

function Explore() {
  const backgroundLink = 'https://ollisco.se/assets/bg2.jpg'; // To avoid bg dissapearing after API call
  const { user, playlists, addTrackToPlaylist } = useSpotifyContext();

  // react use effect
  React.useEffect(() => {
    console.log('useEffect');
    // close the effect
  }, []);

  return (
    <View>
      <ImageBackground
        source={backgroundLink} // To avoid bg dissapearing after API call
        style={styles.bg}
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
