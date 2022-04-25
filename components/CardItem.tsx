import React, { useContext } from 'react';
import {
  Text, View, Image, Dimensions, TouchableOpacity,
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

function CardItem({
  hasActions,
  image,
  artist,
  matches,
  track: name,
}: CardItemT) {
  const { volume, updateVolume, rgb } = useContext(SwipeCardContext) as SwipedCardContextT;

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
   

      {console.log()}
      {hasActions && (

      <Slider
        style={{ width: 250, height: 10, marginTop: 10 }}
        minimumValue={0}
        maximumValue={20}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        disabled
        thumbTintColor="#00000000"
        value={10}
      />
      )}

      {/* NAME */}
      <Text style={styles.nameStyle}>{name}</Text>

      <Text style={[styles.artist, styles.artistText]}>{artist}</Text>

      {hasActions

      && (
      <View style={styles.volumeSlider}>
        <Icon name="md-volume-low" color={WHITE} size={20} />
        <Slider
          style={{ width: 200, height: 20 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FFFFFF"
          value={volume}
          onValueChange={(value) => updateVolume(value)}
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
            <Icon name="pause" color={DISLIKE_ACTIONS} size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.miniButton}>
            <Icon name="add" color={STAR_ACTIONS} size={20} />
          </TouchableOpacity>

        </View>
      )}
    </View>
  );
}

export default CardItem;
