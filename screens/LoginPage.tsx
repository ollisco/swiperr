// create a react functional component

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import { Icon } from '../components';
import DATA from '../assets/data/dummy_data_songs';
import styles, { DARK_GRAY } from '../assets/styles';
import CardItemSmall from '../components/CardItemSmall';
import BG_IMAGE from '../assets/images/bg2.jpg';
import useSpotifyContext from '../hooks/useAuth';

function LoginPage() {
  const { likedSongs, getLikedSongs, token } = useSpotifyContext();

  return (
    <View>
      <Text>
        Login
      </Text>
      ;
    </View>
  );
}

export default LoginPage;
