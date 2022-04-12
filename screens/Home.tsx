import React, { createContext, useContext, useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { Settings, Filters, CardItem, Icon } from "../components";
import styles, { BLACK } from "../assets/styles";
import DATA from "../assets/data/dummy_data_songs";
import VolumeContext, { SwipeCardContext } from "../components/VolumeContext";
import SwipeCardProvider from "../components/VolumeContext";
import { SwipedCardContextT } from "../types";
import CardStackHandler from "../components/CardStackHandler";

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

        <SwipeCardProvider >
          <CardStackHandler />
        {/* <CardStack
          loop
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={(newSwiper): void => setSwiper(newSwiper)}
          onSwipe={(x, y) => setDist(x)}
        >
          {DATA.map((item) => (
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
        </CardStack> */}
        </SwipeCardProvider>
      
          </View>
    </ImageBackground>
  );
};

export default Home;
