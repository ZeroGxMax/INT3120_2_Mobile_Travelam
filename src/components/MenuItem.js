import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { auth } from '../services/firebaseService'

export default MenuItem = ({ title, firstItem, property }) => {
  const user = auth.currentUser;
  const menuStyles = [styles.menu];
  const textMenuStyles = [styles.textMenu];
  const [editable, setEditable] = useState(false)
  if (firstItem) {
    menuStyles.push(styles.firstItem);
    textMenuStyles.push(styles.firstItem);
  }
  return (
    <>
      <View style={menuStyles}>
        <Text style={styles.menuItem}>{title}</Text>
        {editable ? (
          <TouchableOpacity onPress={() => setEditable(false)}>
            <AntDesign name="checkcircleo" size={24} color="grey" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setEditable(true)}>
            <Image
              source={require('../assets/edit.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {editable ? (
        <View style={styles.customizeMenu}>
          <Text style={styles.menuItemCustomize}>Current {title}: {user[property]}</Text>
          <TextInput
            style={{
              color: '#262626',
              letterSpacing: 0,
              alignSelf: 'flex-start',
              flex: 1,
              marginTop: 20
            }}
            placeholder={"Enter New " + title + "                                       "}
          />
        </View>
      ) : (
        null
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
  customizeMenu: {
    borderColor: '#CBCBCB',
    padding: 20,
    flexDirection: 'column',
    backgroundColor: "#DDD",
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
    letterSpacing: 0,
    alignSelf: 'flex-start',
    flex: 1,
  },
  menuItemCustomize: {
    color: '#262626',
    letterSpacing: 0,
    alignSelf: 'flex-start',
    flex: 1,
  },
  icon: {
    alignSelf: 'flex-end',
  },
});