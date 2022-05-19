import React from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { IconT } from '../types';

function Icon({
  color, name, size, style, onPress, useFontAwesome,
}: IconT) {
  if (!useFontAwesome) {
    return <Ionicons name={name} size={size} color={color} style={style} onPress={onPress} />;
  }
  return <FontAwesome name={name} size={size} color={color} style={style} onPress={onPress} />;
}

export default Icon;
