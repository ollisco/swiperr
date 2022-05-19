// create a react functional component

import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import useSpotifyContext from '../hooks/useSpotifyAuth';

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
