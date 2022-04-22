import React from 'react';
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
} from 'react-native';
import { Icon, Message } from '../components';
import DEMO from '../assets/data/dummy_data_profiles';
import styles, { GRAY } from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';

function Messages() {
  return (
    <View>
    <ImageBackground
      source={BG_IMAGE}
      style={styles.bg}
    />
      <View style={styles.containerMessages}>
        <View style={styles.top}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Icon name="person-add" color={GRAY} size={20} style={styles.topIconRight} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={DEMO}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Message
                image={item.image}
                name={item.name}
                lastMessage={item.message}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default Messages;
