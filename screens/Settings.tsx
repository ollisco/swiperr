import { View, Text, ImageBackground, Switch } from 'react-native';
import React, { useState } from 'react';
import styles, { GRAY } from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';
import { SettingItemSwitch } from '../components';
import SettingItemDropdown from '../components/SettingItemDropdown';


function Settings () {
  
  return (
    <View>
        <ImageBackground
            source={BG_IMAGE}
            style={styles.bg}
        >
            <SettingItemSwitch
                text='Setting number 1'
                onPress={() => {}}
                value={true}
            />
            <SettingItemSwitch
            // lorem ipsum
                text='Setting number 2 lorem ipsum lipsum'
                onPress={() => {}}
                value={true}
            />
            <SettingItemDropdown
                header='Header'
                explanation='Explanation and showing how large this text should be'
                options={['Option 1', 'Option 2', 'Option 3']}
            />
            
        </ImageBackground>
    </View>
  )
}

export default Settings