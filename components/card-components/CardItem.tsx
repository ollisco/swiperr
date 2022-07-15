import React, { useContext } from 'react';
import {
  Text, View, Image, TouchableOpacity, Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from '../Icon';
import { CardItemT, SwipedCardContextT } from '../../types';

import styles, {
  DIMENSION_HEIGHT,
  DIMENSION_WIDTH,
  DISLIKE_ACTIONS,
  ERROR,
  FLASH_ACTIONS,
  SPOTIFY_GREEN,
  WHITE,
} from '../../assets/styles';
import { SwipeCardContext } from './CardProvider';
import useSpotifyContext from '../../hooks/useSpotifyAuth';

function CardItem({
  hasActions,
  image,
  artist,
  popularity,
  track,
  releaseDate,
  id: index,

}: CardItemT) {
  const {
    volume, updateVolume, rgb, setPressedTrack, setShowPlaylists, showType,
    swiper, allowVolumeControll,
    recommendedIndex,
    setRecommendedIndex,
    newReleasesIndex,
    setNewReleasesIndex,
  } = useContext(SwipeCardContext) as SwipedCardContextT;
  const {
    user,
    isPlaying,
    setIsPlaying,
    switchPlayingState,
    token,
    setVolume,
    recommendedTracks: userRecommendedTracks,
    newReleases,

  } = useSpotifyContext();

  if (track.length > 25) {
    track = `${track.slice(0, 25)}...`;
  }

  const isLandscape = () => DIMENSION_WIDTH >= DIMENSION_HEIGHT && Platform.OS === 'web';

  const landScapeWeb = isLandscape() ? styles.containerCardItemWeb : {};

  const styleContainer = [styles.containerCardItem, { backgroundColor: rgb }, landScapeWeb];
  const flexDir = isLandscape() ? 'row' : 'column';
  return (
    <View style={styleContainer}>
      {/* IMAGE */}
      <View style={{ flexDirection: flexDir }}>
        <Image source={image} style={styles.imageStyle} />
      </View>
      <View style={styles.matchesCardItem}>
        <Text style={styles.matchesTextCardItem}>
          <Icon name="heart" color={WHITE} size={13} />
          {' '}
          {popularity || '0'}
          % Popularity
        </Text>
      </View>

      {/* NAME */}

      <Text style={styles.trackStyle}>{track}</Text>

      <View style={styles.artist}>
        <Text style={styles.artistText}>{artist}</Text>
        {releaseDate && (
          <Text style={styles.releaseDate}>{releaseDate}</Text>
        )}
      </View>
      <View style={{ flexDirection: flexDir }}>
        {allowVolumeControll && (
        <View style={styles.volumeSlider}>
          <Icon name="md-volume-low" color={WHITE} size={20} />
          <Slider
            style={{ width: 200, height: 10 }}
            minimumValue={0}
            maximumValue={100}
            step={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            thumbTintColor="#FFFFFF"
            value={volume}
            onValueChange={(value: number) => {
              updateVolume(value);
            // Cant set volume here due to exceeding API rate limit
            }}
            onSlidingComplete={(value: number) => {
              if (token) {
                setVolume(value);
              }
            }}
          />
          <Icon name="md-volume-high" color={WHITE} size={20} />
        </View>
        )}

        {/* ACTIONS */}
        {hasActions && (
        <View style={styles.actionsCardItem}>

          <TouchableOpacity style={styles.miniButton}>
            <Icon
              name="close"
              color={ERROR}
              size={20}
              onPress={() => {
                swiper?.swipeLeft();
              }}

            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.miniButton}>
            <Icon
              name="reload"
              color={FLASH_ACTIONS}
              size={20}
              onPress={() => {
                swiper?.swipeBack();
                setRecommendedIndex(recommendedIndex - 2);
                setNewReleasesIndex(newReleasesIndex - 2);
              }}

            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            {isPlaying
              ? (
                <Icon
                  name="pause"
                  color={DISLIKE_ACTIONS}
                  size={30}
                  onPress={() => {
                    if (token) { // user is logged in
                      switchPlayingState();
                    } else { // user is not logged in switch icon for mock page
                      setIsPlaying(!isPlaying);
                    }
                  }}
                />
              )
              : (
                <Icon
                  name="play"
                  color={DISLIKE_ACTIONS}
                  size={30}
                  onPress={() => {
                    if (token) {
                      switchPlayingState();
                    } else { // user is not logged in switch icon for mock page
                      setIsPlaying(!isPlaying);
                    }
                  }}
                />
              )}

          </TouchableOpacity>
          <TouchableOpacity style={styles.miniButton}>
            <Icon
              name="add"
              color={FLASH_ACTIONS}
              size={20}
              onPress={() => {
                if (token) {
                  if (showType === 'recommended') {
                    setPressedTrack(userRecommendedTracks[index]);
                  } else if (showType === 'new') {
                    setPressedTrack(newReleases[index]);
                  } else {
                    console.log('invalid showType');
                  }
                }

                setShowPlaylists(true);
              }}
            />

          </TouchableOpacity>
          <TouchableOpacity style={styles.miniButton}>
            <Icon
              name="heart-o"
              color={SPOTIFY_GREEN}
              size={20}
              onPress={() => {
                swiper?.swipeRight();
              }}
              useFontAwesome
            />
          </TouchableOpacity>

        </View>
        )}
      </View>
      <View style={{ flexDirection: flexDir }}>
        <Text style={[styles.reminderText, { fontSize: 15 }]}>
          You need to have the spotify app active to use this application.
          Try playing and pausing your current song, and make sure your queue is empty.
        </Text>
      </View>
    </View>
  );
}

export default CardItem;
