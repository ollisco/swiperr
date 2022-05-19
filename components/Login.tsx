import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import styles, { DARK_GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useSpotifyAuth';
import { SwipeCardContext } from './SwipeCardProvider';
import { SwipedCardContextT } from '../types';

function Login() {
  const { promptAsync } = useSpotifyContext();
  const { setShowType } = useContext(SwipeCardContext) as SwipedCardContextT;

  async function awaitPromptAsync() {
    setShowType('recommended');
    await promptAsync();

  }

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={styles.login} onPress={awaitPromptAsync}>
        <Text style={styles.loginText}>
          <Icon name="spotify" size={13} color={DARK_GRAY} useFontAwesome />
          {' Login'}
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.login} onPress={awaitPromptAsync}>
        <Text style={styles.loginText}>
          <Icon name="soundcloud" size={13} color={DARK_GRAY} useFontAwesome />
          {' Login'}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

export default Login;
