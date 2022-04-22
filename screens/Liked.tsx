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

function Liked() {
  return (
    <View>
      <ImageBackground
        source={BG_IMAGE}
        style={styles.bg}
      >
        <View style={styles.containerMatches}>
          <View style={styles.top}>
            <Text style={styles.title}>Liked Songs</Text>
            <TouchableOpacity>
              <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
            </TouchableOpacity>
          </View>

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
        </View>
      </ImageBackground>
    </View>
  );
}

export default Liked;
