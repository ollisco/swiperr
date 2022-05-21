import { View, Text, ImageBackground, Switch } from 'react-native';
import React, { useState } from 'react';
import styles, { GRAY } from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';
import { SettingItem } from '../components';


function Settings () {
  
  return (
    <View>
        <ImageBackground
            source={BG_IMAGE}
            style={styles.bg}
        >
            <SettingItem
                text='Hello'
                onPress={() => {}}
                value={true}
            />
            <SettingItem
                text='Hello'
                onPress={() => {}}
                value={true}
            />
            <SettingItem
                text='Hello'
                onPress={() => {}}
                value={true}
            />
            
        </ImageBackground>
    </View>
  )
}

export default Settings