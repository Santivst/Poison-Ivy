import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../constants/colors";

import CartItem from "../components/CartItem/CartItem"
import { usePostOrderMutation } from "../services/shopServices"; 



const Cart = () => {
    const { items:CartData, total } = useSelector((state)=> state.cart.value)
    const [triggerPostOrder, result] =usePostOrderMutation()
    const {localId} = useSelector( state => state.auth.value)

    onConfirmOrder = () => {
        triggerPostOrder({items: CartData, user:localId, total})
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={CartData}
                keyExtractor={(pepe) => pepe.id}
                renderItem={({ item }) => {
                    return <CartItem cartItem={item} />;
                }}
            />
            <View style={styles.totalContainer}>
                <Pressable onPress={onConfirmOrder} style={styles.pressable}>
                    <Text>Confirm</Text>
                </Pressable>
                <Text>Total: ${total}</Text>
            </View>
        </View>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        flex: 1,
        flexDirection: "column",
        marginBottom: 120,
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    pressable: {
        backgroundColor: colors.primary,
        color: "black",
        padding: 5,
        borderRadius: 5,
        margin: 10
    }
});