import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Settings, Filters } from '../components';
import styles from '../assets/styles';
import SwipeCardProvider from '../components/SwipeCardProvider';
import CardStackHandler from '../components/CardStackHandler';

function Explore() {
  const backgroundLink = 'https://ollisco.se/assets/bg2.jpg'; // To avoid bg dissapearing after API call
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
