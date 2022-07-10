import React from 'react';
import { Text, View, Image } from 'react-native';
import { CardItemRowT } from '../../types';

import styles from '../../assets/styles';

function CardItemRow({
  image,
  name,
}: CardItemRowT) {
  return (
    <View style={styles.containerCardItemRow}>
      {/* IMAGE */}
      <Image source={image} style={styles.playlistImage} />
      {/* NAME */}
      <Text style={styles.playlistText}>{name}</Text>
    </View>
  );
}

export default CardItemRow;
