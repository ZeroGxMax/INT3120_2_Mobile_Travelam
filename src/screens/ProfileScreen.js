import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Link } from 'react-router-native';

import MenuItem from '../components/MenuItem';
import { auth } from '../services/firebaseService'



export default Account = () => {
  const user = auth.currentUser;
  const menus = [
    {
      title: 'Name',
      prop: 'displayName'
    },
    {
      title: 'Phone Number',
      prop: 'phoneNumber'
    },
    {
      title: 'E-mail',
      prop: 'email'
    },
    {
      title: 'Change Password',
      prop: 'email'
    },
    {
      title: 'Address',
      prop: 'email'
    },
    {
      title: 'Credit Card',
      prop: 'email'
    },
  ];
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerTitle}>
          
        </View>
        <View style={styles.content}>
          <View>
            <View style={styles.profileImageContainer}>
              <Image
                source={require('../assets/avatar-1-pink-bg.png')}
                style={styles.profileImage}
              />
              <TouchableOpacity>
                <View style={styles.smallIconContainer}>
                  <Image
                    source={require('../assets/edit_small.png')}
                    style={styles.smallIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 75 }}>
              <Text style={styles.name}>{user.displayName}</Text>
              <Text style={styles.description}>{user.email}</Text>
              <ScrollView style={styles.menuContainer}>
                {menus.map((menu, key) => (
                  <MenuItem
                    title={menu.title}
                    key={key}
                    firstItem={key === 0 ? true : false}
                    property={menu.prop}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </>

  );
};
const styles = StyleSheet.create({
  profileImageContainer: {
    position: 'absolute',
    top: -75,
    alignSelf: 'center',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderColor: '#fff',
    borderWidth: 6,
  },
  smallIconContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#8CC33F',
    width: 24,
    height: 24,
    borderRadius: 12,
    right: 5,
    bottom: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    letterSpacing: 0,
    color: '#262626',
    alignSelf: 'center',
  },
  description: {
    fontSize: 12,
    letterSpacing: 0,
    color: '#808080',
    alignSelf: 'center',
  },
  menuContainer: {
    marginTop: 25,
  },
  container: {
    flex: 1,
    backgroundColor: '#8CC33F',
  },
  headerTitle: {
    marginTop: 10,
    padding: 20,
    flex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 0,
    justifyContent: 'flex-start',
  },
  content: {
    backgroundColor: '#fff',
    flex: 4,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  icon: {
    width: 21,
    height: 18,
    justifyContent: 'flex-start',
    marginRight: 20,
  },
  backButton: {alignSelf: 'center', padding: 5, paddingLeft: 0},
});