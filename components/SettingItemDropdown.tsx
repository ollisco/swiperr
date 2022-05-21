import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SettingItemDropdownT, SettingItemSwitchT } from '../types';
import { SPOTIFY_GREEN, WHITE, GRAY, BLACK, DARK_GRAY, DARKER_GRAY } from '../assets/styles/index';
import ModalDropdown from 'react-native-modal-dropdown';

function SettingItemDropdown ({
  header,
  explanation,
  options,
}: SettingItemDropdownT) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
      <ModalDropdown
        style={styles.dropdownNonpress}
        options={options}
        defaultValue={'Select an option'}
        dropdownStyle={styles.dropdown}
        dropdownTextHighlightStyle={styles.dropdownTextHighlight}
        textStyle={styles.header}
        showsVerticalScrollIndicator={false}
        dropdownTextStyle={styles.dropdownText}
        onSelect={(index: any, value: any) => {
          console.log(index, value);
        }}
      />
    </View>
  )
}

export default SettingItemDropdown

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
  header: {
      fontSize: 18,
      color: WHITE,
  },
  dropdown: { 
    width: 150,
    height: 100, 
    borderColor: BLACK,
    borderWidth: 1,
    borderRadius: 3,
  },
  dropdownNonpress: {
  borderBottomWidth: 1,
  borderBottomColor: GRAY,
  padding: 5,
  width: '40%',
  },
  dropdownText: {
    fontSize: 18,
    color: GRAY,
    backgroundColor: DARKER_GRAY,
    borderColor: BLACK,
  },
  dropdownTextHighlight: {
    color: WHITE,
  },
  explanation: {
    fontSize: 14,
    color: GRAY,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '60%',
  },
});