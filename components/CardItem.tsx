import React from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { CardItemT } from "../types";
import Slider from '@react-native-community/slider';
import IMAGE_TRANSPARENT from "../assets/images/transparent.png";


import styles, {
  DISLIKE_ACTIONS,
  FLASH_ACTIONS,
  LIKE_ACTIONS,
  STAR_ACTIONS,
  WHITE,
  DARK_GRAY,
  BLACK,
} from "../assets/styles";

const CardItem = ({
  hasActions,
  hasVariant,
  image,
  artist,
  matches,
  name,
}: CardItemT) => {
  // Custom styling
  const fullWidth = Dimensions.get("window").width;

  const imageStyle = [
    {
      borderRadius: 8,
      width: hasVariant ? fullWidth / 2 - 30 : fullWidth - 80,
      height: hasVariant ? 170 : 350,
      margin: hasVariant ? 0 : 20,
    },
  ];

  const nameStyle = [
    {
      paddingTop: hasVariant ? 10 : 15,
      paddingBottom: hasVariant ? 5 : 7,
      color: WHITE,
      fontSize: hasVariant ? 15 : 30,
    },
  ];

  return (
    <View style={styles.containerCardItem}>
      {/* IMAGE */}
      <Image source={image} style={imageStyle} />

      

      {/* MATCHES */}
      {matches && (
        <View style={styles.matchesCardItem}>
          <Text style={styles.matchesTextCardItem}>
            <Icon name="heart" color={WHITE} size={13} /> {matches}% Match!
          </Text>
        </View>
      )}
    {hasActions && (
    <Slider
        style={{width: 300, height: 10, marginTop: 10}}
        minimumValue={0}
        maximumValue={20}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        disabled={true}      
        thumbTintColor="#00000000"
        value={10}
        //thumbImage={IMAGE_TRANSPARENT}
        />  
      )}

      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      <View style={styles.status}>
        <Text style={styles.statusText}>{artist}</Text>
      </View>
      
      {hasActions && (
      <View style={styles.volumeSlider}>
        <Icon name="md-volume-low" color={WHITE} size={20}></Icon>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FFFFFF"
        />
        <Icon name="md-volume-high" color={WHITE} size={20}></Icon>
      </View>
      )}

      {/* ACTIONS */}
      {hasActions && (
        <View style={styles.actionsCardItem}>
          <TouchableOpacity style={styles.miniButton}>
            <Icon name="add" color={STAR_ACTIONS} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="heart" color={LIKE_ACTIONS} size={20} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Icon name="pause" color={DISLIKE_ACTIONS} size={30} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            {/*send */}
            <Icon name="arrow-redo" color={BLACK} size={20} /> 
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.miniButton}>
            <Icon name="volume-mute" color={FLASH_ACTIONS} size={14} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CardItem;
