import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors.js";
import { Entypo } from "@expo/vector-icons";

import { removeCartItem } from "../../features/cart/cartSlice.js";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();
    
    const handleRemove = () => {
        dispatch(removeCartItem(cartItem.id));
    };

    return (
        <View style={styles.card} onPress={() => { }}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    {cartItem.title} ({cartItem.quantity})
                </Text>
                <Text style={styles.text2}>{cartItem.brand}</Text>
                <Text style={styles.text2}>${cartItem.price}</Text>
            </View>
            <Pressable
                onPress={handleRemove}
                style={({ pressed }) => [
                    {
                        transform: [{ scale: pressed ? 0.95 : 1 }],
                        opacity: pressed ? 0.6 : 1,
                    },
                ]}
            >
                <Entypo name="trash" size={30} color="black" />
            </Pressable>
        </View>
    );
};

export default CartItem;

const styles = StyleSheet.create({
    card: {
        height: 100,
        backgroundColor: colors.platinum,
        padding: 10,
        margin: 10,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    textContainer: {
        width: "70%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    text: {
        fontFamily: "Josefin",
        fontSize: 19,
        color: colors.base,
    },
    text2: {
        fontFamily: "Josefin",
        fontSize: 14,
        color: colors.base,
    },
});