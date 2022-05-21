import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SettingItemT } from '../types';



function SettingItem ({
  text,
  onPress,
  value,
}: SettingItemT) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onPress}
            value={value}
        />
    </View>
  )
}

export default SettingItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: '10%',
    },
    text: {
        fontSize: 20,
        color: '#fff',
    }
});