import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

import AddButton from "../components/AddButton/AddButton";
import MapPreview from "../components/MapPreview/MapPreview";
import { colors } from "../constants/colors.js";
import { googleMapsApiKey } from "../databases/googleMaps.js"
import { usePostLocationMutation } from "../services/shopServices.js";



const LocationSelector = ({ navigation }) => {
    const [location, setLocation] = useState({ latitude: "", longitude: "" });
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    const [triggerPostUserLocation, result] = usePostLocationMutation()
    const { localId } = useSelector((state) => state.auth.value)

    const onConfirmAddress = () => {
        const date = new Date()
        triggerPostUserLocation({
            location: {
                latitude: location.latitude,
                longitude: location.longitude,
                address: address,
                updatedAt: date
            },
            localId: localId
        });
    };

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status === "granted") {
                    let location = await Location.getCurrentPositionAsync({});
                    setLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;
                const response = await fetch(url_reverse_geocode);
                const data = await response.json();
                setAddress(data.results[0].formatted_address);
            } catch (err) {
                console.log(err)
            }
        })()
    }, [location])


    return (
        <View style={styles.container}>
            <Text style={styles.text}>My Address</Text>
            {location ? (
                <>
                    <Text style={styles.text}>
                        Lat: {location.latitude}, long: {location.longitude}.
                    </Text>
                    <MapPreview location={location} />
                    <Text style={styles.address}>Formatted address: {address}</Text>
                    <AddButton onPress={onConfirmAddress} title="Confirm address" />
                </>
            ) : (
                <>
                    <View style={styles.noLocationContainer}>
                        <Text>{error}</Text>
                    </View>
                </>
            )}
        </View>
    );
};

export default LocationSelector;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    text: {
        paddingTop: 20,
        fontFamily: "Josefin",
        fontSize: 18,
    },
    noLocationContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.primary,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    address: {
        padding: 10,
        fontSize: 16,
    },
});