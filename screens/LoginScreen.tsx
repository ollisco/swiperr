import { View, Text, Button, Image, StatusBar, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); // Maybe remove

const config = {
    iosClientId: '1029181124854-lsnpj2grnerbges0jio1rbj2ggo29o41.apps.googleusercontent.com',
    androidClientId: '1029181124854-4525710ob94m95h69ac6vqosd004dic9.apps.googleusercontent.com',
    expoClientId: '1029181124854-4vfhtis83ajcdns1nlauac7jg10drs4p.apps.googleusercontent.com',
    scopes: ['profile', 'email'], //
    permissions: ['public_profile', 'email', 'gender', 'location'] // 
};

const LoginScreen = () => {
    const [accessToken, setAccessToken] = React.useState<string | undefined>();
    const [userInfo, setUserInfo] = React.useState<any>();
    const [message, setMessage] = React.useState<any>();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: '1029181124854-4525710ob94m95h69ac6vqosd004dic9.apps.googleusercontent.com',
        iosClientId: '1029181124854-lsnpj2grnerbges0jio1rbj2ggo29o41.apps.googleusercontent.com',
        expoClientId: '1029181124854-4vfhtis83ajcdns1nlauac7jg10drs4p.apps.googleusercontent.com',
        webClientId: '1029181124854-4525710ob94m95h69ac6vqosd004dic9.apps.googleusercontent.com'
    });

    React.useEffect(() => {
        console.log(0);
        setMessage(JSON.stringify(response));
        if (response?.type === 'success') {
            setAccessToken(response.authentication?.accessToken);
        }
    }, [response]);

    async function getUserData() {
        const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
    
        userInfoResponse.json().then(data => {
            setUserInfo(data);
        });
    }

    function showUserInfo() {
        if (userInfo) {
            return (
                <View>
                    <Image source={{uri: userInfo.picture}} style={styles.profilePic} />
                    <Text>Welcome {userInfo.name}</Text>
                    <Text>{userInfo.email}</Text>
                </View>
            );
        }
    }
    

    return (
        <View>
            {showUserInfo()}
            <Button 
                title={accessToken ? 'Get User Data' : 'Login'}
                onPress={accessToken ? getUserData : () => { promptAsync({useProxy: false, showInRecents: true}); }}
            />
            <StatusBar/>
        </View>
    );
};

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
        height: 50
    }
});