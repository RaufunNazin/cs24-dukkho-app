import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={require('../assets/bg.jpeg')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/profile.png')}
            style={{width: 80, height: 80, borderRadius: 40, marginBottom: 10}}
          />
          <Text style={{color: 'black', fontSize: 20, fontWeight: 700}}>
            Name
          </Text>
          <Text style={{color: 'black', fontSize: 16}}>Role</Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: 'white', paddingTop: 10}}>
          <DrawerItemList {...props} />
          <View
            style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
            <Text>Custom Drawer</Text>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;
