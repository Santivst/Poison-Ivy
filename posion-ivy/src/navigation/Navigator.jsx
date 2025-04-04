import { StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";

import { useDispatch, useSelector } from "react-redux";

import AuthStack from "./AuthStack";


//NUEVO CLASE 16

import { useDB } from "../hooks/useDB.js";

//

const Navigator = () => {
  // const [user, setUser] = useState(null)
  const {user} = useSelector(state => state.auth.value)

  //NUEVO CLASE 16

  const dispatch = useDispatch()
  const {getSession} = useDB()


  // obtener la session
  useEffect(()=>{
    (async ()=> {
      try{
        const response = await getSession()
        if(response) {
          const user = response;
          dispatch(
            setUser({
              email: user.email,
              localId: user.localId,
              idToken: user.token
          }))
        }
      } catch (err){
        console.log(err)
      }
    })()
  },)
  //

  return (

      <NavigationContainer>
        {user ? <BottomTabNavigator /> : <AuthStack />}
      </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});



















/*
!ANTES DE LOS CAMBIOS DE LA CLASE 10



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from "../screens/Home"
import ItemListCategory from "../screens/ItemListCategory";
import ItemDetail from '../screens/ItemDetail'



const Stack = createNativeStackNavigator();


const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'>
        <Stack.Screen 
          component={Home}
          name='Home' 
          options={{ title: "Home" }}/>
        <Stack.Screen
        component={ItemListCategory}
        name='ItemListCategory' 
        options={{ title: "Productos" }}/>
        <Stack.Screen
        component={ItemDetail}
        name='ItemDetail' 
        options={{ title: "Producto" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}



export default Navigator

const styles = StyleSheet.create({})


*/

