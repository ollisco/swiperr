import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import styles, { DARK_GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useAuth';
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
    <TouchableOpacity style={styles.login} onPress={awaitPromptAsync}>

      <Text style={styles.loginText}>
        <Icon name="log-in" size={13} color={DARK_GRAY} />
        Login
      </Text>
    </TouchableOpacity>
  );
}

export default Login;
