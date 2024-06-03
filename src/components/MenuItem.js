import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { auth, firebaseApp } from '../services/firebaseService'
import { getCustomerFromId } from "../services/firebase/user"
import { colors } from "../assets/colors/colors"
import { ref, getDatabase, update } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/native";

export default MenuItem = ({ title, firstItem, property, context }) => {
  const { value, setValue } = useContext(context);
  const navigation = useNavigation()
  const [user, setUser] = useState({});
  const menuStyles = [styles.menu];
  const textMenuStyles = [styles.textMenu];
  const [editable, setEditable] = useState(false)
  const [text, setText] = useState("")
  const [forceUpdate, setForceUpdate] = useState(false);
  if (firstItem) {
    menuStyles.push(styles.firstItem);
    textMenuStyles.push(styles.firstItem);
  }


  const submitEditProfile = async (prop, text) => {
    // console.log("Prop: " + prop, "Text: ", text)
    try {
      const userAuth = auth.currentUser;
      let newUser = user
      newUser[prop] = text
      const db = getDatabase(firebaseApp);
      const userRef = ref(db, `customer/data/` + userAuth['uid']);

      // Update user profile data in the Realtime Database
      await update(userRef, newUser);
      setUser(newUser)
      setValue('Update Parent ' + text)
      setEditable(false)

      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      setError("Error updating user profile: " + error.message);
    }

    setForceUpdate(prevState => !prevState);

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all countries
        const userAuth = auth.currentUser;
        const userData = await getCustomerFromId(userAuth.uid);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [value]);

  return (
    <>
      <View style={menuStyles}>
        {editable ? (
          <Text style={{
            color: '#262626',
            letterSpacing: 0,
            alignSelf: 'flex-start',
            flex: 1,
            fontWeight: '600'
          }}>{title}</Text>
        ) : (
          <Text style={styles.menuItem}>
            <Text style={{ fontWeight: '600' }}>{title}</Text>
            <Text secureTextEntry={property === 'userId'}>: {user[property]}</Text>
          </Text>
        )}
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
              marginTop: 20,
              borderBottomWidth: 1,
              borderBottomColor: '#AAA'
            }}
            onChangeText={setText}
            value={text}
            placeholder={"Enter New " + title + "                                                                    "}
          />
          <TouchableOpacity
            style={sty.buttonWrapper}
            onPress={() => {
              submitEditProfile(property, text)
              Alert.alert("Saving ....")
            }

            }
          >
            <Text style={{ color: "white", fontWeight: 600, fontSize: 18 }}>Save</Text>
          </TouchableOpacity>
        </View >
      ) : (
        null
      )
      }
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

const sty = StyleSheet.create({
  buttonWrapper: {
    marginLeft: 270,
    marginTop: 15,
    backgroundColor: "#666",
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 10,
    color: "white"
  },
})