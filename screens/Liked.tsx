import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import { Icon } from '../components';
import DATA from '../assets/data/dummy_data_songs';
import styles, { DARK_GRAY } from '../assets/styles';
import CardItemSmall from '../components/CardItemSmall';
import BG_IMAGE from '../assets/images/bg2.jpg';
import useSpotifyContext from '../hooks/useAuth';

function Liked() {
  const { likedSongs, getLikedSongs, token } = useSpotifyContext();

  React.useEffect(() => {
    likedSongs ? console.log('Yes') : console.log('No');
    if (!likedSongs && token !== null) {
      console.log('Getting tokens');
      getLikedSongs(token.accessToken);
      console.log('L:', likedSongs);
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
                    image={item.track.album.images[0].url}
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
