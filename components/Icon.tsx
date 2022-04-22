import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IconT } from '../types';

function Icon({
  color, name, size, style, onPress,
}: IconT) {
  return <Ionicons name={name} size={size} color={color} style={style} onPress={onPress} />;
}

export default Icon;
