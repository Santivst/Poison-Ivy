import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {useFonts} from 'expo-font';

import Header from './src/components/Header/Header';
import Home from './src/screens/Home';
import ItemListCategory from './src/screens/ItemListCategory';
import ItemDetail from './src/screens/ItemDetail';
import { colors } from './src/constants/colors';

import Navigator from './src/navigation/Navigator';

//NUEVO CLASE 12

import { Provider } from 'react-redux';
import store from './src/store'

///

//NUEVO CLASE 16

import { useDB } from './src/hooks/useDB';

//import { initDB } from './src/persistence';

//



export default function App() {
  // const [fontsLoaded, fontError] = useFonts({
  //   Josefin: require("./assets/JosefinSans-Regular.ttf"),
  // });

  //NUEVO CLASE 16

  // inicializar base de session
  const { initDB } = useDB();

  useEffect(() => {
    initDB();
  }, []);

  //



  // const [fontsLoaded, fontError] = useFonts({
  //   Josefin: require("./assets/JosefinSans-Regular.ttf"),
  // })

  // if(!fontsLoaded || fontError) {
  //   return null;
  // }

  // if(fontsLoaded && !fontError) {
    return (

        <Provider store={store}>
          <Navigator/>
        </Provider>

    );
  // }
}


/*
(Justo debajo del export default en caso de falla)
  const [categorySelected, setCategorySelected] = useState("");
  const [itemIdSelected, setItemIdSelected] = useState("");


(Dentro de return en caso de falla)

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

*/

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'android' ? 0 : 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
