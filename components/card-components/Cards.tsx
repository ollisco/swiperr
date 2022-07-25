import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import styles from '../../assets/styles';
import useSpotifyContext from '../../hooks/useSpotifyAuth';
import CardStackHandler from './CardStackHandler';
import { SwipeCardContext } from './CardProvider';
import { SwipedCardContextT } from '../../types';

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
