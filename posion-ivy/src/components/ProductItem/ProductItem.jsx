import { StyleSheet, Text, Image, Pressable, useWindowDimensions } from 'react-native'
import React from 'react'
import { colors } from '../../constants/colors'

import Card from '../Card/Card'


//Para cargar las imagenes las imagenes
import { images } from "../../img/images.js"


const ProductItem = ({
    product,
    navigation,
}) => {
    // Obtiene las dimensiones de la ventana
    const { width, height } = useWindowDimensions();
    // Determina la orientación
    const orientation = width > height ? "portrait" : "landscape";

    // Función para obtener la imagen
    const getImage = (imagePath) => {
        const parts = imagePath.split("/");
        const fileName = parts[parts.length - 1]; // Extrae solo el nombre del archivo
        return images[fileName] || null;
    };


    return (
        <Card style={styles.additionalStylesCard}>
            <Pressable
                style={styles.pressable}
                onPress={() => navigation.navigate('ItemDetail', { productId: product.id })}
            >
                <Text style={styles.textCategory}>{product.title}</Text>
                <Image
                    source={getImage(product.images[0])}
                    resizeMode="cover"
                    style={orientation === "portrait" ? styles.image : styles.imageLandscape}
                />
            </Pressable>
        </Card>
    )
}

export default ProductItem



const styles = StyleSheet.create({
    image: {
        height: 120,
        width: 100,
        borderRadius: 8,
    },
    additionalStylesCard: {
        height: 120,
        width: 300,
        margin: 10,
    },
    textCategory: {
        color: colors.tertiary,
        width: "70%",
    },
    pressable: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 10,
    },
});