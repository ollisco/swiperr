import React from 'react';
import { Text, View, Image } from 'react-native';
import { MessageT } from '../types';
import styles from '../assets/styles';

function Message({ image, lastMessage, name }: MessageT) {
  return (
    <View style={styles.containerMessage}>
      <Image source={image} style={styles.avatar} />
      <View>
        <Text style={styles.messageName}>{name}</Text>
        <Text style={styles.message}>{lastMessage}</Text>
      </View>
    </View>
  );
}

export default Message;
