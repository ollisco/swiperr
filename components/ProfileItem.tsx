import React from 'react';
import { Text, View } from 'react-native';
import Icon from './Icon';
import { ProfileItemT } from '../types';
import styles, { DARK_GRAY, WHITE } from '../assets/styles';

function ProfileItem({
  info1,
  info2,
  info3,
  info4,
  location,
  matches,
  name,
}: ProfileItemT) {
  return (
    <View style={styles.containerProfileItem}>
      <View style={styles.matchesProfileItem}>
        <Text style={styles.matchesTextProfileItem}>
          <Icon name="heart" size={13} color={WHITE} />
          {' '}
          {matches}
          % Liked Songs
        </Text>
      </View>

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.descriptionProfileItem}>
        {location}
      </Text>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="person" size={12} color={WHITE} />
        </Text>
        <Text style={styles.infoContent}>{info1}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="musical-notes" size={12} color={WHITE} />
        </Text>
        <Text style={styles.infoContent}>{info2}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="location" size={12} color={WHITE} />
        </Text>
        <Text style={styles.infoContent}>{location}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.iconProfile}>
          <Icon name="reader" size={12} color={WHITE} />
        </Text>
        <Text style={styles.infoContent}>{info4}</Text>
      </View>
    </View>
  );
}

export default ProfileItem;
