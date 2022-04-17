import {
  View, Text, Button, Image, StatusBar, StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import useAuth from '../hooks/useAuth';

WebBrowser.maybeCompleteAuthSession(); // Maybe remove

const config = {
  iosClientId: '1029181124854-lsnpj2grnerbges0jio1rbj2ggo29o41.apps.googleusercontent.com',
  androidClientId: '1029181124854-4525710ob94m95h69ac6vqosd004dic9.apps.googleusercontent.com',
  expoClientId: '1029181124854-4vfhtis83ajcdns1nlauac7jg10drs4p.apps.googleusercontent.com',
  scopes: ['profile', 'email'], //
  permissions: ['public_profile', 'email', 'gender', 'location'], //
};

function LoginScreen() {
  const {
    user, accessToken, getUser, promptAsync,
  } = useAuth();

  function showUserInfo() {
    if (user) {
      return (
        <View>
          <Image source={{ uri: user.picture }} style={styles.profilePic} />
          <Text>
            Welcome
            {user.name}
          </Text>
          <Text>{user.email}</Text>
        </View>
      );
    }
  }

  return (
    <View>
      {showUserInfo()}
      <Button
        title={accessToken ? 'Get User Data' : 'Login'}
        onPress={accessToken ? getUser : () => { promptAsync({ useProxy: false, showInRecents: true }); }}
      />
      <StatusBar />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
  },
});
