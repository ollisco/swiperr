import { useContext } from 'react';
import React, {
  FlatList, TouchableOpacity, View, ScrollView, Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../assets/styles';
import useSpotifyContext from '../hooks/useAuth';
import CardItemRow from './CardItemRow';
import { SwipeCardContext } from './SwipeCardProvider';
// import swipcardcontext from types
import { SwipedCardContextT } from '../types';

function Playlists() {
  const { playlists, addTrackToPlaylist, token } = useSpotifyContext();

  const { pressedTrack, showPlaylists } = useContext(SwipeCardContext) as SwipedCardContextT;
  if (playlists && showPlaylists) {

    return (
      <View style={{ flex: 1, backgroundColor: '#000000' }}>
        <Text style={{ color: '#FFFFFF', position: 'relative', zIndex: 2, flex: 0 }}> 
        Only select a playlist where you can add songs
        </Text>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            {showPlaylists ? (
              <FlatList
                numColumns={1}
                data={playlists}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ index, item }) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      addTrackToPlaylist(token.accessToken, item.id, pressedTrack);
                    }}
                  >
                    <CardItemRow
                      image={item.images[0].url}
                      name={item.name}
                    />
                  </TouchableOpacity>
                )}
              />
            ) : <></>}
          </ScrollView>
        </SafeAreaView>
      </View>
    ) ;
  } else {
    return (<></>)
  }
}
export default Playlists;
