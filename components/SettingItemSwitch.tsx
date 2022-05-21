import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SettingItemSwitchT } from '../types';
import { SPOTIFY_GREEN, WHITE, GRAY } from '../assets/styles/index';



function SettingItemSwitch ({
  text,
  onPress,
  value,
}: SettingItemSwitchT) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Switch
            trackColor={{ false: "#767577", true: SPOTIFY_GREEN }}
            thumbColor={value ? SPOTIFY_GREEN : "#FFFFFF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onPress}
            value={value}
        />
    </View>
  )
}

export default SettingItemSwitch

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
    text: {
        fontSize: 18,
        color: WHITE,
        borderRadius: 3,
        borderColor: GRAY,
    }
});