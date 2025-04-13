import React, { useState, useEffect } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import Navigator from './src/navigation/Navigator';
import store from './src/store'
import { useDB } from './src/hooks/useDB';



export default function App() {
  const { initDB } = useDB();

  useEffect(() => {
    initDB();
  }, []);


    return (
        <Provider store={store}>
          <Navigator/>
        </Provider>
    );

}



const styles = StyleSheet.create({
});
