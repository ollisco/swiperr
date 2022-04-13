import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  View,
  FlatList,
} from "react-native";
import { Icon, Message } from "../components";
import DEMO from "../assets/data/dummy_data_profiles";
import styles, { DARK_GRAY, GRAY } from "../assets/styles";

const Messages = () => (
  <ImageBackground
    source={require("../assets/images/bg2.jpg")}
    style={styles.bg}
  >
    <View style={styles.containerMessages}>
      <View style={styles.top}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity>
          <Icon name="person-add" color={GRAY} size={20} style={styles.topIconRight} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={DEMO}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Message
              image={item.image}
              name={item.name}
              lastMessage={item.message}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  </ImageBackground>
);

export default Messages;
