import { useContext } from 'react';
import React, {
  FlatList, TouchableOpacity, View, ScrollView, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, { DARK_GRAY, GRAY } from '../assets/styles';
import useSpotifyContext from '../hooks/useAuth';
import CardItemRow from './CardItemRow';
import { SwipeCardContext } from './SwipeCardProvider';
// import swipcardcontext from types
import { SwipedCardContextT } from '../types';
import Icon from './Icon';
import { dummyDataPlaylists } from '../assets/data/dummy_data_playlists';

function Playlists() {
  const { playlists, addTrackToPlaylist, token } = useSpotifyContext();

  const {
    pressedTrack,
    showPlaylists,
    setShowPlaylists,
    swiper,
  } = useContext(SwipeCardContext) as SwipedCardContextT;


  if (showPlaylists) {
    return (
      <View style={styles.containerPlaylists}>
        <View style={styles.playlistsTopRow}>
          <Text style={{ color: '#000000', fontSize: 15 }}>
            Only select a playlist where you can add songs
          </Text>
          <Icon
            name="close"
            size={30}
            color="#000000"
            style={{ marginLeft: 'auto', color: DARK_GRAY }}
            onPress={() => setShowPlaylists(false)}
          />
        </View>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            {playlists ? (
              <FlatList
                numColumns={1}
                data={playlists}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ index, item }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      addTrackToPlaylist(token.accessToken, item.id, pressedTrack);
                      setShowPlaylists(false);
                      swiper?.swipeRight();
                    }}
                  >
                    <CardItemRow
                      image={item.images[0].url}
                      name={item.name}
                    />
                  </TouchableOpacity>
                )}
              />
              ) : (
                <FlatList
                numColumns={1}
                data={dummyDataPlaylists}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ index, item }) => (
                  <TouchableOpacity
                    key={item.id}
                  >
                    <CardItemRow
                      image={item.image}
                      name={item.name}
                    />
                  </TouchableOpacity>
                )}
              />

              )}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
  return (<></>);
}
export default Playlists;
