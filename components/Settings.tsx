import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import styles, { DARK_GRAY } from "../assets/styles";

const Settings = () => (
  <TouchableOpacity style={styles.city}>
    <Text style={styles.cityText}>
      <Icon name="settings-sharp" size={15} color={DARK_GRAY} />
    </Text>
  </TouchableOpacity>
);

export default Settings;
