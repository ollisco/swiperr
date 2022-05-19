import React from 'react';
import { Text, View } from 'react-native';
import Icon from './Icon';
import { ProfileItemT } from '../types';
import styles, { DARK_GRAY, WHITE } from '../assets/styles';

function ProfileItem({
  followerCount,
  location,
  name,
  topTracks,
  topArtists,
  topGenres,
}: ProfileItemT) {
  return (
    <View style={styles.containerProfileItem}>

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.descriptionProfileItem}>
        {followerCount}
        {' followers '}
        -
        {' '}
        {location}
      </Text>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="person" size={12} color={WHITE} />
        </Text>
        <Text style={styles.infoContent}>{topArtists}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="musical-notes" size={12} color={WHITE} />
        </Text>
        <Text style={styles.infoContent}>{topTracks}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="albums-outline" size={12} color={WHITE} />
        </Text>
        <Text style={styles.infoContent}>{topGenres}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="location" size={12} color={WHITE} />
        </Text>
        <Text style={styles.infoContent}>{location}</Text>
      </View>

    </View>
  );
}

export default ProfileItem;
