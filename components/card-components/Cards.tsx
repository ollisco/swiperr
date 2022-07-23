import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import styles from '../../assets/styles';
import Settings from '../Settings';
import Filters from '../Filters';
import useSpotifyContext from '../../hooks/useSpotifyAuth';
import CardStackHandler from './CardStackHandler';
import { SwipeCardContext } from './CardProvider';
import { SwipedCardContextT } from '../../types';

type Props = {}

function Cards(props: Props) {
  const {
    user, queueAndSkip, recommendedTracks: userRecommendedTracks, newReleases,

  } = useSpotifyContext();
  const {
    showType, setShowType, recommendedIndex, newReleasesIndex,
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
              if (showType !== 'recommended' && userRecommendedTracks) {
                setShowType('recommended');
                queueAndSkip(userRecommendedTracks[recommendedIndex]);
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
              if (showType !== 'new' && newReleases) {
                setShowType('new');
                queueAndSkip(newReleases[newReleasesIndex]);
              }
            }}
            >
              <Text style={[styles.exploreTopCenterText, newActiveStyle]}>
                New Releases
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.exploreTopCenter}>
            <TouchableOpacity onPress={() => {
              setShowType('recommended');
            }}
            >
              <Text style={[styles.exploreTopCenterText, recommendedActiveStyle]}>
                Recommended
              </Text>
            </TouchableOpacity>
            <Text style={styles.exploreTopCenterText}>
              |
            </Text>
            <TouchableOpacity
              onPress={() => { setShowType('new'); }}
            >
              <Text style={[styles.exploreTopCenterText, newActiveStyle]}>
                New Releases
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <Filters />
      </View>
      <CardStackHandler />
    </View>
  );
}

export default Cards;
