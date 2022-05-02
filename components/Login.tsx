import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import styles, { DARK_GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useAuth';

function Login() {
  const { promptAsync } = useSpotifyContext();
  // TODO: this should be moved to useAuth hook
  async function awaitPromptAsync() {
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
