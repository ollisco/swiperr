import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Settings, Filters, Login } from '../components';
import styles from '../assets/styles';
import SwipeCardProvider from '../components/SwipeCardProvider';
import CardStackHandler from '../components/CardStackHandler';
import useSpotifyContext from '../hooks/useAuth';

function Explore() {
  const backgroundLink = 'https://ollisco.se/assets/bg2.jpg'; // To avoid bg dissapearing after API call
  const { user } = useSpotifyContext();
  return (
    <View>
      <ImageBackground
        source={backgroundLink} // To avoid bg dissapearing after API call
        style={styles.bg}
      >
        <View style={styles.containerHome}>
          <View style={styles.top}>
            {/* Testing spotify login in settings component */}
            <Settings />
            {user ? <></> : <Login />}
            <Filters />
          </View>
          <SwipeCardProvider>
            <CardStackHandler />
          </SwipeCardProvider>

        </View>
      </ImageBackground>
    </View>
  );
}

export default Explore;
