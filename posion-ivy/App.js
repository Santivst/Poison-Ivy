import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {useFonts} from 'expo-font';

import Home from './src/screens/Home';
import ItemListCategory from './src/screens/ItemListCategory';
import ItemDetail from './src/screens/ItemDetail';
import Header from './src/components/Header/Header';

import Navigator from './src/navigation/Navigator';

import { colors } from './src/constants/colors';


export default function App() {
  const [categorySelected, setCategorySelected] = useState("");
  const [itemIdSelected, setItemIdSelected] = useState("");


  // const [fontsLoaded, fontError] = useFonts({
  //   Josefin: require("./assets/JosefinSans-Regular.ttf"),
  // })

  // if(!fontsLoaded || fontError) {
  //   return null;
  // }

  // if(fontsLoaded && !fontError) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Categories" />
        {!categorySelected ? (
          <Home setCategorySelected={setCategorySelected} />
        ) : !itemIdSelected ? (
          <ItemListCategory
            categorySelected={categorySelected}
            setCategorySelected={setCategorySelected}
            setItemIdSelected={setItemIdSelected}
          />
        ) : (
          <ItemDetail 
            idSelected={itemIdSelected} 
            setProductSelected={setItemIdSelected}
          />
        )}
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  // }
}


const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 0 : 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
