import React from 'react';
import { Text, View } from 'react-native';
import Icon from './Icon';
import styles, {
  DARK_GRAY, GRAY, WHITE, PRIMARY_COLOR,
} from '../assets/styles';
import { TabBarIconT } from '../types';

function TabBarIcon({ focused, iconName, text }: TabBarIconT) {
  const iconFocused = focused ? WHITE : GRAY;

  return (
    <View style={styles.iconMenu}>
      <Icon name={iconName} size={16} color={iconFocused} />
      <Text style={[styles.tabButtonText, { color: iconFocused }]}>{text}</Text>
    </View>
  );
}

export default TabBarIcon;
