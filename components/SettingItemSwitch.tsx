import {
  StyleSheet, Switch, Text, View,
} from 'react-native';
import React, {useState, useCallback} from 'react';
import { SettingItemSwitchT } from '../types';
import { SPOTIFY_GREEN, WHITE, GRAY } from '../assets/styles/index';
import { debounce } from "lodash";


function SettingItemSwitch({
  text,
  onValueChange,
  value,
  explanation,
}: SettingItemSwitchT) {
  const [disabled, setDisabled] = useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
      <Switch
        trackColor={{ false: '#767577', true: SPOTIFY_GREEN }}
        thumbColor={value ? SPOTIFY_GREEN : '#FFFFFF'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
}

export default SettingItemSwitch;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // add border to each flex item
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
    marginTop: -1,

  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '70%',
  },
  text: {
    fontSize: 18,
    color: WHITE,
    borderRadius: 3,
    borderColor: GRAY,
  },
  explanation: {
    fontSize: 14,
    color: GRAY,
  },
});
