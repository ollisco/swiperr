import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon';
import styles, { DARK_GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useSpotifyAuth';
import { redirectUri } from '../hooks/utils/auth-utils';

function Filters() {
  const { newReleases } = useSpotifyContext();
  return (
    <TouchableOpacity style={styles.filters}>
      <Icon name="options" size={15} color={DARK_GRAY} onPress={() => console.log(redirectUri)} />
    </TouchableOpacity>
  );
}

export default Filters;
