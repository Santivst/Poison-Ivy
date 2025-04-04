import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import AddButton from '../components/AddButton/AddButton'
import { useGetProfileImageQuery } from '../services/shopServices.js'


//NUEVO CLASE 16

import { clearUser } from '../features/user/userSlice.js'
import { useDB } from '../hooks/useDB.js'

//

//NUEVO CLASE 16


//

const MyProfile = ({ navigation }) => {

    const { imageCamera, localId } = useSelector(state => state.auth.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)

    //NUEVO CLASE 16

    const { truncateSessionTable } = useDB()
    const dispatch = useDispatch()

    //



    const launchCamera = () => {
        navigation.navigate('Image selector')
    }

    const launchLocation = async () => {
        navigation.navigate("List Address");
    };


    //NUEVO CLASE 16

    const signOut = async () => {
        try {
            const response = await truncateSessionTable()
            console.log(response)
            dispatch(clearUser())
        } catch (err) {
            console.log(err)
        }
    }

    //


    const defaultImageRoute = "../../assets/defaultProfile.png"
    return (
        <View style={styles.container}>
            {imageFromBase || imageCamera ? (
                <Image
                    source={{ uri: imageFromBase?.image || imageCamera }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <Image
                    source={require(defaultImageRoute)}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}

            <AddButton onPress={launchCamera} title="Add profile picture" />
            <AddButton onPress={launchLocation} title="My address" />
            <AddButton onPress={signOut} title="Sign out" />
        </View>
    );
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 15,
        alignItems: "center",
        justifyContent: "flex-start",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});