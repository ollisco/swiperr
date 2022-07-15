import {
  StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { dropdownSize, SettingItemDropdownT } from '../types';
import {
  WHITE, GRAY, BLACK, DARKER_GRAY,
} from '../assets/styles/index';

function SettingItemDropdown({
  header,
  explanation,
  options,
  defaultValue,
  onSelect,
  dropdownSize: size,
}: SettingItemDropdownT) {
  const ddSize = size === dropdownSize.MEDIUM ? 300
    : size === dropdownSize.LARGE ? 400
      : 200;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header}>{header}</Text>
        <Text style={styles.explanation}>{explanation}</Text>
      </View>
      <ModalDropdown
        style={styles.dropdownNonpress}
        options={options}
        defaultValue={defaultValue || 'Select an item...'}
        dropdownStyle={[styles.dropdown, { height: ddSize }]}
        dropdownTextHighlightStyle={styles.dropdownTextHighlight}
        textStyle={styles.header}
        showsVerticalScrollIndicator={false}
        dropdownTextStyle={styles.dropdownText}
        onSelect={(_index: any, value: any) => {
          if (onSelect && value) {
            onSelect(value);
          }
        }}
      />
    </View>
  );
}

export default SettingItemDropdown;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
