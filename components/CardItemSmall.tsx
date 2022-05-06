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
    <View style={styles.containerCardItemSmall}>
      {/* IMAGE */}
      <Image source={image} style={styles.smallImageStyle} />
      {/* NAME */}
      <Text style={styles.smallNameStyle}>{name}</Text>

      <View style={styles.artist}>
        <Text style={[styles.artistText, {fontSize: 10}]}>{artist}</Text>
      </View>
    </View>
  );
}

export default CardItemSmall;
