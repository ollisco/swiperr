import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon';
import styles, { DARK_GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useSpotifyAuth';

function Filters() {
  const { newReleases } = useSpotifyContext();
  return (
    <TouchableOpacity style={styles.filters}>
      <Icon name="options" size={15} color={DARK_GRAY} onPress={() => console.log(newReleases)} />
    </TouchableOpacity>
  );
}

export default Filters;
