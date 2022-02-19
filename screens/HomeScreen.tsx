import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import  StackNavigator from '../StackNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


const HomeScreen = () => {
  // any to remove error from when entering string
  const navigation = useNavigation<NativeStackNavigationProp<any>>(); 
  return (
    <View>
      <Text>HomeScreeeen</Text>
      <Button 
        title="Go to Chat Screen" 
        onPress={() => navigation.navigate("Chat")} 
      />
    </View>
  )
}

export default HomeScreen