import React from "react";
import { Text, View, Image, Dimensions  } from "react-native";
import { CardItemT } from "../types";


import styles, {
  WHITE,
} from "../assets/styles";

const CardItemSmall = ({
  image,
  artist,
  track: name,
}: CardItemT) => {
  const fullWidth = Dimensions.get("window").width;


  // TODO: Theese can be moved to styleSheet (assets/styles.ts)
  const imageStyle = [
    {
      borderRadius: 8,
      width: fullWidth / 2 - 30 ,
      height: 170 ,
      margin: 0,
    },
  ];
  const nameStyle = [
    {
      paddingTop: 10,
      paddingBottom: 5 ,
      color: WHITE,
      fontSize: 15,
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
