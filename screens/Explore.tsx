import React from 'react';
import { View, ImageBackground } from 'react-native';
import { Settings, Filters } from '../components';
import styles from '../assets/styles';
import SwipeCardProvider from '../components/SwipeCardProvider';
import CardStackHandler from '../components/CardStackHandler';
import BG_IMAGE from '../assets/images/bg2.jpg';

function Explore() {
  return (
    <View>
      <ImageBackground
        source={BG_IMAGE}
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
