// NUEVO, CLASE 10

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import CartItem from "../components/CartItem/CartItem"



//* COMENTADO POR PROPÓSITOS DE AFTERCLASS04
//import CartData from "../data/cart.json";
///

//! NUEVO AFTERCLASS04
import { useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/shopServices"; 
//

const Cart = () => {
    //* COMENTADO POR PROPÓSITOS DE AFTERCLASS04
    // const total = CartData.reduce(
    //     (acumulador, currentItem) =>
    //         (acumulador += currentItem.price * currentItem.quantity),
    //     0
    // );

    // let total2 = 0;
    // for (const currentItem of CartData) {
    //     console.log(currentItem.id);
    //     total2 += currentItem.price * currentItem.quantity;
    // }
    ///

    //! NUEVO AFTERCLASS04
    const { items:CartData, total } = useSelector((state)=> state.cart.value)
    const [triggerPostOrder, result] =usePostOrderMutation()


    onConfirmOrder = () => {
        triggerPostOrder({items: CartData, user:"Luka", total})
    }
    ///


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
                <Pressable onPress={onConfirmOrder}>
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
        marginBottom: 120,
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});