import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from './Icon';
import styles, { DARK_GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useSpotifyAuth';

function Filters() {
  const { getUserRecommendedTracks, getNewReleases } = useSpotifyContext();

  const update = () => {
    getUserRecommendedTracks();
    getNewReleases();
  };

  return (
    <TouchableOpacity style={styles.filters}>
      <Icon
        name="refresh"
        size={15}
        color={DARK_GRAY}
        onPress={update}
        useFontAwesome
      />
    </TouchableOpacity>
  );
}

export default Filters;
