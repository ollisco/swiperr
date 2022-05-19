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
import useSpotifyContext from '../hooks/useSpotifyAuth';

function Profile() {
  const { user, topTracks, topArtists, topGenres} = useSpotifyContext();
  const {
    image,
    topGenres: mockTopGenres,
    topArtists: mockTopArtists,
    topTracks: mockTopTracks,
    name,
    location,
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
      <View>
        <ImageBackground
          source={BG_IMAGE}
          style={styles.bg}
        />
        <ScrollView style={styles.containerProfile}>
          {user && user.images.length > 0 ? (
            <ImageBackground source={{ uri: user.images[0].url }} style={styles.photo} />

          ) : (
            <ImageBackground source={image} style={styles.photo} />
          )}

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

          {user ? (
            <ProfileItem
              followerCount={user.followers.total}
              name={user.display_name}
              location={getLocation(user.country)}  
              topTracks={topTracks}
              topArtists={topArtists}
              topGenres={topGenres}
            />
          ) : (
            <ProfileItem
              followerCount="20"
              name={name}
              location={location}
              topTracks={mockTopTracks}
              topArtists={mockTopArtists}
              topGenres={mockTopGenres}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

export default Profile;
