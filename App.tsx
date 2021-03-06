import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SpotifyAuthProvider } from './hooks/useSpotifyAuth';
import { ErrorProvider } from './hooks/useError';
import {
  Explore, Liked, LoginPage, Profile,
} from './screens';
import {
  PRIMARY_COLOR, DARK_GRAY, BLACK,
} from './assets/styles';
import TabBarIcon from './components/TabBarIcon';
import Settings from './screens/Settings';
import { Error } from './components';
import { SnippetProvider } from './hooks/useSnippet';
import SwipeCardPrvider from './components/card-components/CardProvider';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <ErrorProvider>
      <SnippetProvider>
        <SpotifyAuthProvider>
          <SwipeCardPrvider>
            <NavigationContainer>
              <Error />
              <Stack.Navigator
                screenOptions={{
                  headerStyle: { elevation: 0 },
                  cardStyle: { backgroundColor: BLACK },
                }}
              >

                <Stack.Screen
                  name="Login"
                  options={{ headerShown: false, animationEnabled: false }}
                  component={LoginPage}
                />

                <Stack.Screen
                  name="Tab"
                  options={{ headerShown: false, animationEnabled: false }}
                >
                  {() => (
                    <Tab.Navigator
                      tabBarOptions={{
                        showLabel: false,
                        activeTintColor: PRIMARY_COLOR,
                        inactiveTintColor: DARK_GRAY,
                        labelStyle: {
                          fontSize: 14,
                          textTransform: 'uppercase',
                          paddingTop: 10,
                        },
                        style: {
                          backgroundColor: BLACK,
                          borderTopWidth: 0,
                          marginBottom: 0,
                          shadowOpacity: 0.05,
                          shadowRadius: 10,
                          shadowColor: BLACK,
                          shadowOffset: { height: 0, width: 0 },
                        },
                      }}
                    >

                      <Tab.Screen
                        name="Explore"
                        component={Explore}
                        options={{
                          tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                              focused={focused}
                              iconName="musical-notes"
                              text="Explore"
                            />
                          ),
                        }}
                      />

                      <Tab.Screen
                        name="Liked"
                        component={Liked}
                        options={{
                          tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                              focused={focused}
                              iconName="heart"
                              text="Liked"
                            />
                          ),
                        }}
                      />

                      {/* <Tab.Screen
                  name="Chat"
                  component={Messages}
                  options={{
                    tabBarIcon: ({ focused }) => (
                      <TabBarIcon
                        focused={focused}
                        iconName="chatbubble"
                        text="Chat"
                      />
                    ),
                  }}
                /> */}

                      <Tab.Screen
                        name="Settings"
                        component={Settings}
                        options={{
                          tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                              focused={focused}
                              iconName="settings-sharp"
                              text="Settings"
                            />
                          ),
                        }}
                      />

                      <Tab.Screen
                        name="Profile"
                        component={Profile}
                        options={{
                          tabBarIcon: ({ focused }) => (
                            <TabBarIcon
                              focused={focused}
                              iconName="person"
                              text="Profile"
                            />
                          ),
                        }}
                      />
                    </Tab.Navigator>
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
          </SwipeCardPrvider>
        </SpotifyAuthProvider>
      </SnippetProvider>
    </ErrorProvider>
  );
}

export default App;
