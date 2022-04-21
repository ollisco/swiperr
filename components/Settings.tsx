import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY } from "../assets/styles";
import useSpotifyAuth from "../hooks/useAuth";

const Settings = () => {
  const { token } = useSpotifyAuth(); 
  
  return (
  <TouchableOpacity style={styles.settings}>
    <Text style={styles.settingsText}>
      <Icon name="settings-sharp" size={15} color={DARK_GRAY} onPress={() => console.log(token)} />
    </Text>
    {/*console.log(response)*/}
  </TouchableOpacity>
)};

export default Settings;
