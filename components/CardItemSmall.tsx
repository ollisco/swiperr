import React, { useContext, useEffect, useState } from "react";
import { Text, View, Image, Dimensions, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { CardItemT, VolumeContextT } from "../types";
import Slider from '@react-native-community/slider';
import IMAGE_TRANSPARENT from "../assets/images/transparent.png";


import styles, {
  WHITE,
} from "../assets/styles";
import {VolumeContext} from "./VolumeContext";

const CardItemSmall = ({
  hasVariant,
  image,
  artist,
  name,
}: CardItemT) => {
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
      {/* NAME */}
      <Text style={nameStyle}>{name}</Text>

      <View style={styles.status}>
        <Text style={styles.statusText}>{artist}</Text>
      </View>
    </View>
  );
};

export default CardItemSmall;
