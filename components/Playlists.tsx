import { useContext } from 'react';
import React, {
  TouchableOpacity, View, ScrollView, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles, { DARK_GRAY, WHITE } from '../assets/styles';
import useSpotifyContext from '../hooks/useSpotifyAuth';
import CardItemRow from './card-components/CardItemRow';
import { SwipeCardContext } from './card-components/CardProvider';
// import swipcardcontext from types
import { SwipedCardContextT } from '../types';
import Icon from './Icon';
import { dummyDataPlaylists } from '../assets/data/dummy_data_playlists';

function Playlists() {
  const { playlists, addTrackToPlaylist, token, 
    queueAndSkip,
    recommendedTracks,
    newReleases,
  } = useSpotifyContext();

  const {
    pressedTrack,
    showPlaylists,
    setShowPlaylists,
    swiper,
    newReleasesIndex,
    setNewReleasesIndex,
    recommendedIndex,
    setRecommendedIndex,
    showType,
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
              playlists.map((item: any) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    addTrackToPlaylist(item.id, pressedTrack.uri);
                    setShowPlaylists(false);
                    swiper?.swipeTop();
                    // if (showType === 'new' && newReleases[newReleasesIndex + 1] !== undefined) {
                    //   queueAndSkip(newReleases[newReleasesIndex + 1].uri);
                    //   setRecommendedIndex(recommendedIndex + 1);
                    //   setNewReleasesIndex(newReleasesIndex + 1);
                      
                    // } else if (showType === 'recommended') {
                    //   queueAndSkip(recommendedTracks[recommendedIndex + 1].uri);
                    //   setRecommendedIndex(recommendedIndex + 1);
                    //   setNewReleasesIndex(newReleasesIndex + 1);
                    // }
                  }}
                >
                  <CardItemRow
                    image={item.images.length > 0 ? { uri: item.images[0].url } : dummyDataPlaylists[0].image}
                    name={item.name}
                  />
                </TouchableOpacity>
              ))

            ) : (

              dummyDataPlaylists.map((item: any) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    setShowPlaylists(false);
                    swiper?.swipeRight();
                  }}
                >
                  <CardItemRow
                    image={item.image}
                    name={item.name}
                  />
                </TouchableOpacity>
              ))
            )}
            {/* Ugly padding hack */}
            <TouchableOpacity>
              <Text style={{ color: WHITE }}>Hello World!</Text>
              <Text style={{ color: WHITE }}>Hello World!</Text>
              <Text style={{ color: WHITE }}>Hello World!</Text>
              <Text style={{ color: WHITE }}>Hello World!</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
  return (<></>);
}
export default Playlists;
function newReleasesIndex(newReleasesIndex: any) {
  throw new Error('Function not implemented.');
}

