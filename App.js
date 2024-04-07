import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Dashboard from "./src/components/dashboard/dashboard"

function App() {
  return (
    <View>
      <View style={styles.bufferBlock} />
      <Dashboard />
    </View>
  );
}

const styles = StyleSheet.create({
  bufferBlock: {
      height: 50
  }
});

export default App;
