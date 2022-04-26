import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { countries } from 'country-data';
import { Icon, ProfileItem } from '../components';
import DEMO from '../assets/data/dummy_data_profiles';
import styles, { WHITE } from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';
import useSpotifyAuth from '../hooks/useAuth';

function Profile() {
  const { user } = useSpotifyAuth();
  const {
    image,
    infoPersonal: info1,
    infoMusic: info2,
    match,
    lastSeen,
  } = DEMO[7];

  function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }

  function getLocation(countryCode: string) {
    // get flag emoji
    const flagEmoji = getFlagEmoji(countryCode);
    // get country name
    const country = countries[countryCode].name;
    return `${country} ${flagEmoji}`;
  }

  return (

    <View>
      {user ? (
        <View>
          <ImageBackground
            source={BG_IMAGE}
            style={styles.bg}
          />
          <ScrollView style={styles.containerProfile}>
            {user.images.length > 0 ? (
              <ImageBackground source={user.images[0].url} style={styles.photo} />
            ) : (
              <ImageBackground source={image} style={styles.photo} />)}
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
              followerCount={user.followers.total}
              name={user.display_name}
              location={getLocation(user.country)}
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
      ) : (
        <Text>No profile loaded</Text>
      )}
    </View>
  );
}

export default Profile;
