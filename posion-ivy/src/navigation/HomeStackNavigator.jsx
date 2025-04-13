import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import ItemListCategory from "../screens/ItemListCategory";
import ItemDetail from "../screens/ItemDetail";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen component={Home} name="Home" />
            <Stack.Screen component={ItemListCategory} name="ItemListCategory" />
            <Stack.Screen component={ItemDetail} name="ItemDetail" />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({});