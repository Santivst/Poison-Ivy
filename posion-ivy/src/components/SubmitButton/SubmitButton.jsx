import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../../constants/colors.js";

const SubmitButton = ({ onPress, title }) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

export default SubmitButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        width: "60%",
    },
    text: {
        color: colors.secondary,
        fontSize: 22,
    },
});