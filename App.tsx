import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { t, color } from 'react-native-tailwindcss';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';

export default function App() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <StackNavigator />
            </AuthProvider>
        </NavigationContainer>
    );
}
