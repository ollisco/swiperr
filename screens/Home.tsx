import React, { createContext, useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { Settings, Filters, CardItem } from "../components";
import styles from "../assets/styles";
import DEMO from "../assets/data/dumm_data_songs";
import VolumeContext from "../components/VolumeContext";
import VolumeProvider from "../components/VolumeContext";

const Home = () => {
  const [swiper, setSwiper] = useState<CardStack | null>(null);


  return (
    <ImageBackground
      source={require("../assets/images/bg2.jpg")}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <Settings />
          <Filters />
        </View>

        <VolumeProvider>
        <CardStack
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper): void => setSwiper(newSwiper)}
        >
          {DEMO.map((item) => (
            <Card key={item.id}>
              <CardItem
                hasActions
                image={item.image}
                name={item.track}
                description={item.artist}
                matches={item.match}
                artist={item.artist}
          
              />
            </Card>
          ))}
        </CardStack>
        </VolumeProvider>
      </View>
    </ImageBackground>
  );
};

export default Home;
