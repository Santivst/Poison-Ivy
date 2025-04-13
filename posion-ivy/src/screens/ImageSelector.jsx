import React, { useState } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import * as ImagePicker from 'expo-image-picker';
import * as ExpoLibrary from "expo-media-library";

import { colors } from "../constants/colors.js";
import AddButton from '../components/AddButton/AddButton';
import { useGetProfileImageQuery, usePostProfileImageMutation } from '../services/shopServices.js';
import { useDispatch, useSelector } from 'react-redux';
import { setCameraImage } from '../features/user/userSlice.js'

const ImageSelector = ({ navigation }) => {

    const [image, setImage] = useState(null)
    const [isImageFromCamera, setIsImageFromCamera] = useState(false);
    const [imageUri, setImageUri] = useState("")

    const { localId } = useSelector(state => state.auth.value)
    const { data: imageFromBase } = useGetProfileImageQuery(localId)

    const [triggerPostImage, result] = usePostProfileImageMutation()
    const dispatch = useDispatch()

    const vefifyCameraPermissions = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync()
        return granted
    }

    const vefifyGalleryPermissions = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        return granted;
    };

    const pickLibraryImage = async () => {

        try {
            setIsImageFromCamera(false)
            const permisssionGallery = await vefifyGalleryPermissions();
            if (permisssionGallery) {
                const result = await ImagePicker.launchImageLibraryAsync({
                    base64: true,
                    allowsEditing: true,
                    aspect: [1, 1],
                    mediaTypes: (ImagePicker.MediaType = ["images"]),
                    quality: 0.2,
                });

                console.log(result)

                if (!result.canceled) {
                    const image = `data:image/jpeg;base64,${result.assets[0].base64}`
                    setImage(image);
                }
            }
        } catch (err) {
            console.log(err)
        }
    }



    const pickImage = async () => {
        setIsImageFromCamera(true);
        try {
            const permissionCamera = await vefifyCameraPermissions()
            if (permissionCamera) {
                let result = await ImagePicker.launchCameraAsync({
                    mediaTypes: (ImagePicker.MediaType = ['images', 'videos']),
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: true,
                    quality: 0.2,
                });

                console.log(result)

                if (!result.canceled) {
                    setImageUri(result.assets[0].uri)
                    const img = `data:image/jpg;base64,${result.assets[0].base64}`
                    setImage(img)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const confirmImage = async () => {
        try {
            dispatch(setCameraImage(image))
            triggerPostImage({ image, localId })
            if (isImageFromCamera) {
                const result = await ExpoLibrary.createAssetAsync(imageUri)
            }

            navigation.goBack()
        } catch (err) {
            console.log(err)
        }

    }

    console.log({ image })


    return (
        <View style={styles.container}>
            {image || imageFromBase ? (
                <>
                    <Image source={{ uri: image || imageFromBase }} style={styles.image} />
                    <AddButton title="Take another photo" onPress={pickImage} />
                    <AddButton title="Pick photo from gallery" onPress={pickLibraryImage} />
                    <AddButton title="Confirm photo" onPress={confirmImage} />
                </>
            ) : (
                <>
                    <View style={styles.noPhotoContainer}>
                        <Text> No photo to show... </Text>
                    </View>
                    <AddButton title="Take a photo" onPress={pickImage} />
                </>
            )}
        </View>
    );
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 20,
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    noPhotoContainer: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: colors.primary,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});