import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import { Icon, CardItemSmall } from '../components';
import DATA from '../assets/data/dummy_data_songs';
import styles, { DARK_GRAY } from '../assets/styles';
import BG_IMAGE from '../assets/images/bg2.jpg';
import useSpotifyContext from '../hooks/useSpotifyAuth';

function Liked() {
  const { likedSongs, getLikedSongs, token } = useSpotifyContext();

  React.useEffect(() => {
    if (!likedSongs && token !== null) {
      getLikedSongs(token.accessToken);
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
            <TouchableOpacity>
              <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
            </TouchableOpacity>
          </View>

          {likedSongs ? (
            <FlatList
              numColumns={2}
              data={likedSongs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <CardItemSmall
                    image={{ uri: item.track.album.images[0].url }}
                    track={item.track.name}
                    artist={item.track.artists[0].name}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <FlatList
              numColumns={2}
              data={DATA}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <CardItemSmall
                    image={item.image}
                    track={item.track}
                    artist={item.artist}
                  />
                </TouchableOpacity>
              )}
            />
          )}

        </View>
      </ImageBackground>
    </View>
  );
}

export default Liked;
