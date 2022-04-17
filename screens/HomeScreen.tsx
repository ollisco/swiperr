import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import StackNavigator from '../StackNavigator';

function HomeScreen() {
  // any to remove error from when entering string
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <View>
      <Text>HomeScreeeen</Text>
      <Button
        title="Go to Chat Screen"
        onPress={() => navigation.navigate('Chat')}
      />
    </View>
  );
}

export default HomeScreen;
