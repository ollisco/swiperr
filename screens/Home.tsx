import React from "react";
import { View, ImageBackground } from "react-native";
import { Settings, Filters } from "../components";
import styles from "../assets/styles";
import SwipeCardProvider from "../components/VolumeContext";
import CardStackHandler from "../components/CardStackHandler";

const Home = () => {
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
        
        </SwipeCardProvider>
      
          </View>
    </ImageBackground>
  );
};

export default Home;
