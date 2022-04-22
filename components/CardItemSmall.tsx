import React from 'react';
import { Text, View, Image } from 'react-native';
import { CardItemT } from '../types';

import styles from '../assets/styles';

function CardItemSmall({
  image,
  artist,
  track: name,
}: CardItemT) {
  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image source={image} style={styles.smallImageStyle} />
      {/* NAME */}
      <Text style={styles.smallNameStyle}>{name}</Text>

      <View style={styles.status}>
        <Text style={styles.statusText}>{artist}</Text>
      </View>
    </View>
  );
}

export default CardItemSmall;
