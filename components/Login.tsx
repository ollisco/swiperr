import React, { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import styles, { DARK_GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useSpotifyAuth';
import { SwipeCardContext } from './card-components/CardProvider';
import { SwipedCardContextT } from '../types';

export function LoginMock({ navigation }: any) {
  const { promptAsync } = useSpotifyContext();
  const { setShowType } = useContext<SwipedCardContextT>(SwipeCardContext);

  const login = async () => {
    await setShowType('recommended');
    await navigation.navigate('Tab');
  };

  return (
    <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <TouchableOpacity style={styles.login} onPress={login}>
        <Text style={styles.loginText}>
          Try it out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default function Login({ navigation }: any) {
  const { promptAsync } = useSpotifyContext();
  const { setShowType } = useContext<SwipedCardContextT>(SwipeCardContext);

  const login = async () => {
    await setShowType('recommended');
    await promptAsync();
    await navigation.navigate('Tab');
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity style={styles.login} onPress={login}>
        <Text style={styles.loginText}>
          <Icon name="spotify" size={30} color={DARK_GRAY} useFontAwesome />
          {' Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
