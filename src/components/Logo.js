import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export const Logo = ({ uri }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={uri} style={styles.image} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    margin: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
});
