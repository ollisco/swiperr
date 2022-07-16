import React from 'react';
import { Text, View, Image } from 'react-native';
import { CardItemT } from '../../types';

import styles from '../../assets/styles';

function CardItemSmall({
  image,
  artist,
  track,
}: CardItemT) {
  const maxLength = 20;
  if (track.length > maxLength) {
    track = `${track.slice(0, maxLength)}...`;
  }
  return (
    <View style={styles.containerCardItemSmall}>
      {/* IMAGE */}
      <Image source={image} style={styles.smallImageStyle} />
      {/* NAME */}
      <Text style={styles.smallNameStyle}>{track}</Text>

      <View style={styles.artist}>
        <Text style={[styles.artistText, { fontSize: 15 }]}>{artist}</Text>
      </View>
    </View>
  );
}

export default CardItemSmall;
