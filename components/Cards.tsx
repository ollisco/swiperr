import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import styles from '../assets/styles';
import Settings from './Settings';
import Filters from './Filters';
import Login from './Login';
import useSpotifyContext from '../hooks/useAuth';
import CardStackHandler from './CardStackHandler';
import { SwipeCardContext } from './SwipeCardProvider';
import { SwipedCardContextT } from '../types';

type Props = {}

function Cards(props: Props) {
  const { user } = useSpotifyContext();
  return (
    <View style={styles.containerHome} onPress={() => console.log(1)}>
      <View style={styles.top}>
        {/* Testing spotify login in settings component */}
        <Settings />
        {user ? <></> : <Login />}
        <Filters />
      </View>

      <CardStackHandler />
    </View>
  );
}

export default Cards;
