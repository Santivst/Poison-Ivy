import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from '../constants/colors.js';

import HomeStackNavigator from './HomeStackNavigator';
import CartStackNavigator from './CartStackNavigator'
import OrderStackNavigator from './OrderStackNavigator'
import MyProfileStackNavigator from './MyProfileStackNavigator';

import Header from '../components/Header/Header'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBar: () => {
                    return <Header route={route} />
                },
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen
                name="Ecomerce"
                component={HomeStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="store"
                                    size={24}
                                    color={focused ? "black" : colors.tertiary}
                                />
                            </View>
                        );
                    },
                }}
            />

            <Tab.Screen
                name="Cart"
                component={CartStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome6
                                    name="cart-shopping"
                                    size={24}
                                    color={focused ? "black" : colors.tertiary}
                                />
                            </View>
                        );
                    },
                }}
            />

            <Tab.Screen
                name="Orders"
                component={OrderStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <FontAwesome5
                                    name="receipt"
                                    size={24}
                                    color={focused ? "black" : colors.tertiary}
                                />
                            </View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="My Profile"
                component={MyProfileStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View>
                                <Ionicons
                                    name="person-circle"
                                    size={24}
                                    color={focused ? "black" : colors.tertiary}
                                />
                            </View>
                        );
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTabNavigator

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.secondary,
        shadowColor: "black",
        elevation: 4,
        borderRadius: 15,
        height: 60,
    },
});