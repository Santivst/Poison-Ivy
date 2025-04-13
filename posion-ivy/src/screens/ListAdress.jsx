import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import { useGetLocationQuery } from "../services/shopServices.js";
import AddButton from "../components/AddButton/AddButton";
import AddressItem from "../components/AddressItem/AddressItem";


const ListAddress = ({ navigation }) => {
    const { localId } = useSelector((state) => state.auth.value)
    const { data: location, isLoading, error } = useGetLocationQuery(localId)

    return location ? (
        <AddressItem location={location} navigation={navigation} />
    ) : (
        <View style={styles.container}>
            <Text style={styles.text}>No location set</Text>
            <AddButton
                title="Set location"
                onPress={() => navigation.navigate("Location Selector")}
            />
        </View>
    );
};

export default ListAddress;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    text: {
        paddingVertical: 20,
        fontFamily: "Josefin",
        fontSize: 18,
    },
});