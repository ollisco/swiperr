import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Icon, ProfileItem } from '../components';
import DEMO from '../assets/data/dummy_data_profiles';
import styles, { WHITE } from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';

function Profile() {
  const {
    age,
    image,
    infoPersonal: info1,
    infoMusic: info2,
    location,
    match,
    name,
    lastSeen,
  } = DEMO[7];

  return (
    <View>
      <ImageBackground
        source={BG_IMAGE}
        style={styles.bg}
      />
      <ScrollView style={styles.containerProfile}>
        <ImageBackground source={image} style={styles.photo} />
        <View style={styles.top}>
          <TouchableOpacity>
            <Icon
              name="swap-horizontal-outline"
              size={20}
              color={WHITE}
              style={styles.topIconLeft}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon
              name="ellipsis-vertical"
              size={20}
              color={WHITE}
              style={styles.topIconRight}
            />
          </TouchableOpacity>
        </View>

        <ProfileItem
          matches={match}
          name={name}
          age={age}
          location={location}
          info1={info1}
          info2={info2}
          info4={lastSeen}
        />

        <View style={styles.actionsProfile}>
          <TouchableOpacity style={styles.circledButton}>
            <Icon name="ellipsis-horizontal" size={20} color={WHITE} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.roundedButton}>
            <Icon name="chatbubble" size={20} color={WHITE} />
            <Text style={styles.textButton}>Start chatting</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
