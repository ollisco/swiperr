import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import styles, { DARK_GRAY } from '../assets/styles';
import useSpotifyAuth from '../hooks/useAuth';

function Filters() {
  const { promptAsync } = useSpotifyAuth();
  // TODO: this should be moved to useAuth hook
  async function awaitPromptAsync() {
    await promptAsync();
  }

  return (
    <TouchableOpacity style={styles.filters}>
      <Text style={styles.filtersText}>
        <Icon name="options" size={13} color={DARK_GRAY} onPress={awaitPromptAsync} />
      </Text>
    </TouchableOpacity>
  );
}

export default Filters;
