import { View, Text, TouchableOpacity } from 'react-native';
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
  const {
    user, queueAndSkip, token, userRecommendedTracks, newReleases,
  } = useSpotifyContext();
  const {
    showType, setShowType, recommendedIndex, newReleasesIndex,
    setRecommendedIndex, setNewReleasesIndex,
  } = useContext(SwipeCardContext) as SwipedCardContextT;

  const recommendedActiveStyle = showType === 'recommended' ? styles.exploreTopCenterTextActive : {};
  const newActiveStyle = showType === 'new' ? styles.exploreTopCenterTextActive : {};

  return (
    <View style={styles.containerHome}>
      <View style={styles.top}>
        {/* Testing spotify login in settings component */}
        <Settings />
        {user ? (
          <View style={styles.exploreTopCenter}>
            <TouchableOpacity onPress={() => {
              if (showType !== 'recommended') {
                setShowType('recommended');
                queueAndSkip(token.accessToken, userRecommendedTracks[recommendedIndex].uri);
              }
            }}
            >
              <Text style={[styles.exploreTopCenterText, recommendedActiveStyle]}>
                Recommended
              </Text>
            </TouchableOpacity>
            <Text style={styles.exploreTopCenterText}>
              |
            </Text>
            <TouchableOpacity onPress={() => {
              if (showType !== 'new') {
                setShowType('new');
                queueAndSkip(token.accessToken, newReleases[newReleasesIndex].uri);
              }
            }}
            >
              <Text style={[styles.exploreTopCenterText, newActiveStyle]}>
                New Releases
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Login />
        )}
        <Filters />
      </View>
      <CardStackHandler />
    </View>
  );
}

export default Cards;
