// create a react functional component

import React from 'react';
import {
  View,
  ImageBackground,
} from 'react-native';
import BACKGROUND_IMAGE from '../assets/swiperr-splash.png';
import { CARD_HEIGHT, DIMENSION_HEIGHT } from '../assets/styles';
import { Login } from '../components';
import { LoginMock } from '../components/Login';

function LoginPage({ navigation }: any) {
  return (
    <ImageBackground style={{ height: '100%' }} source={BACKGROUND_IMAGE}>
      <View style={{ height: DIMENSION_HEIGHT }}>
        <View style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: CARD_HEIGHT * 0.65,
          // space between rows

        }}
        >
          <Login navigation={navigation} />
          <LoginMock navigation={navigation} />
        </View>
      </View>
    </ImageBackground>
  );
}

export default LoginPage;
