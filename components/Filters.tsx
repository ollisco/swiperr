import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import styles, { DARK_GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useAuth';

function Filters() {
  const { playlists } = useSpotifyContext();
  return (
    <TouchableOpacity style={styles.filters}>
      <Icon name="options" size={13} color={DARK_GRAY} onPress={() => console.log(1337)} />
    </TouchableOpacity>
  );
}

export default Filters;
