import { View } from 'react-native';
import React from 'react';
import styles from '../../assets/styles';
import CardStackHandler from './CardStackHandler';

type Props = {}

function Cards(props: Props) {
  return (
    <View style={styles.containerHome}>
      {/* <View style={styles.top}> */}
      {/* <Settings /> */}
      {/* <TopRow /> */}
      {/* <Filters /> */}
      {/* </View> */}
      <CardStackHandler />
    </View>
  );
}

export default Cards;
