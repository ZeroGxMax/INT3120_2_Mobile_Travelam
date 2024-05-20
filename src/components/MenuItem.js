import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

export default MenuItem = ({ title, firstItem }) => {
  const menuStyles = [styles.menu];
  const textMenuStyles = [styles.textMenu];
  const [editable, setEditable] = useState(false)
  if (firstItem) {
    menuStyles.push(styles.firstItem);
    textMenuStyles.push(styles.firstItem);
  }
  return (
    <>
      {editable ? (
        <View
          style={textMenuStyles}
        >
          <TextInput
            style={{ fontSize: 17 }}
            placeholder={"Enter " + title + "                                       "}
          />
          <TouchableOpacity onPress={() => setEditable(false)}>
            <AntDesign name="checkcircleo" size={24} color="grey" />
          </TouchableOpacity>

        </View>
      ) : (
        <View style={menuStyles}>
          <Text style={styles.menuItem}>{title}</Text>
          <TouchableOpacity onPress={() => setEditable(true)}>
            <Image
              source={require('../assets/edit.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  firstItem: {
    borderTopWidth: 1,
  },
  menu: {
    borderBottomWidth: 1,
    borderColor: '#CBCBCB',
    padding: 20,
    flexDirection: 'row',
  },
  textMenu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#C0C0C0",
    borderRadius: 7,
    borderBottomWidth: 1,
    borderColor: '#CBCBCB',
    padding: 20,
    flexDirection: 'row',
  },
  menuItem: {
    color: '#262626',
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0,
    alignSelf: 'flex-start',
    flex: 1,
  },
  icon: {
    alignSelf: 'flex-end',
  },
});