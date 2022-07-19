import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
} from 'react-native';
import { CardItemSmall } from '../components';
import DATA from '../assets/data/dummy_data_songs';
import styles from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';
import useSpotifyContext from '../hooks/useSpotifyAuth';

function Liked() {
  const { likedSongs, getLikedSongs, token } = useSpotifyContext();

  React.useEffect(() => {
    if (!likedSongs && token !== null) {
      getLikedSongs();
    }
  }, [likedSongs, getLikedSongs, token]);

  return (
    <View>
      <ImageBackground
        source={BG_IMAGE}
        style={styles.bg}
      >
        <View style={styles.containerLiked}>
          <View style={styles.top}>
            <Text style={styles.title}>Liked Songs</Text>
          </View>
          {/* <SafeAreaView>
            <ScrollView> */}
          {likedSongs ? (
            <FlatList
              numColumns={2}
              data={likedSongs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <CardItemSmall
                    image={{ uri: item.track.album.images[0].url }}
                    track={item.track.name}
                    artist={item.track.artists[0].name}
                  />
                </View>
              )}
            />
          ) : (
            <FlatList
              numColumns={2}
              data={DATA}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ index, item }) => (
                <View>
                  <CardItemSmall
                    id={index}
                    image={item.image}
                    track={item.track}
                    artist={item.artist}
                  />
                </View>
              )}
            />
          )}
          {/* Ugly padding hack */}
          <View>
            <Text>Padding</Text>
            <Text>Padding</Text>
            <Text>Padding</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Liked;
