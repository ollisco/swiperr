import React, { useContext } from 'react';
import {
  Text, View, Image, TouchableOpacity, Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from './Icon';
import { CardItemT, SwipedCardContextT } from '../types';

import styles, {
  DISLIKE_ACTIONS,
  FLASH_ACTIONS,
  STAR_ACTIONS,
  WHITE,
} from '../assets/styles';
import { SwipeCardContext } from './SwipeCardProvider';
import useSpotifyContext from '../hooks/useAuth';

function CardItem({
  hasActions,
  image,
  artist,
  popularity: matches,
  track,
  releaseDate,
  id: index,

}: CardItemT) {
  const {
    volume, updateVolume, rgb, setPressedTrack, setShowPlaylists,
  } = useContext(SwipeCardContext) as SwipedCardContextT;
  const {
    isPlaying,
    setIsPlaying,
    switchPlayingState,
    token,
    setVolume,
    userRecommendedTracks,
  } = useSpotifyContext();

  // check if track is longer than 50 chars long
  const trackTextStyle = track.length > 50 ? styles.trackStyleLong : styles.trackStyleShort;

  return (

    <View style={[styles.containerCardItem, { backgroundColor: rgb }]}>
      {/* IMAGE */}
      <Image source={image} style={styles.imageStyle} />

      <View style={styles.matchesCardItem}>
        <Text style={styles.matchesTextCardItem}>
          <Icon name="heart" color={WHITE} size={13} />
          {' '}
          {matches}
          % Popularity
        </Text>
      </View>

      {/* NAME */}
      <Text style={[styles.trackStyle, trackTextStyle]}>{track}</Text>
      
      <View style={styles.artist}>
        <Text style={ styles.artistText}>{artist}</Text>
        {releaseDate && (
          <Text style={styles.artistText}> - {releaseDate}</Text>
        )}
      </View>
      {Platform.OS === 'web' && (
      <View style={styles.volumeSlider}>
        <Icon name="md-volume-low" color={WHITE} size={20} />
        <Slider
          style={{ width: 200, height: 20 }}
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
              setVolume(token.accessToken, value);
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
            <Icon name="arrow-redo" color={FLASH_ACTIONS} size={14} />
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
                      switchPlayingState(token.accessToken);
                    } else { // user is not logged in switch icon for mock page
                      setIsPlaying(!isPlaying);
                      console.log();
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
                      switchPlayingState(token.accessToken);
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
              color={STAR_ACTIONS}
              size={20}
              onPress={() => {
                if (token) {
                  setPressedTrack(userRecommendedTracks[index].uri);
                }
                setShowPlaylists(true);
              }}
            />

          </TouchableOpacity>

        </View>
      )}
      <View>
        <Text style={[styles.reminderText, { fontSize: 15 }]}>
          You need to have the spotify app active to use this application.
          Try playing and pausing your current song, and make sure your queue is empty.
        </Text>
      </View>
    </View>
  );
}

export default CardItem;
