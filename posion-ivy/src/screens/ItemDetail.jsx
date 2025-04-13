import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch } from "react-redux";

import { images } from "../img/images.js"

import { colors } from "../constants/colors.js";
import { useGetProductsByIdQuery } from "../services/shopServices.js";
import { addCartItem } from "../features/cart/cartSlice.js";



const ItemDetail = ({ route, navigation }) => {
  const [orientation, setHorientation] = useState('portrait');
  const { width, height } = useWindowDimensions();
  const {productId:idSelected} = route.params;
  const {data: product, error, isLoading} = useGetProductsByIdQuery(idSelected)

  const dispatch = useDispatch();
  
  useEffect(() => {
    if(width > height) setHorientation("landscape")
    else setHorientation("portrait")
    
  }, [width, height]);

//!IMPORTANTE
    // Función para obtener la imagen
    const getImage = (imagePath) => {
      const parts = imagePath.split("/");
      const fileName = parts[parts.length - 1]; // Extrae solo el nombre del archivo
      return images[fileName] || null;
    };
    
    const handleAddCart = () => {
      dispatch(addCartItem({...product, quantity: 1}))
    }


  return (
    <View>
      <Button onPress={() => navigation.goBack()} title="Go back" color={colors.primary}/>
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }>
          <Image
            source={getImage(product.images[0])}
            resizeMode="contain"
            style={[
              styles.imageBase,
              orientation === "portrait" ? styles.imagePortrait : styles.imageLandscape
            ]}
          />
          <View style={orientation === 'portrait' ? styles.textContainer : styles.textContainerLandscape}> 
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Button title="Add cart" onPress={handleAddCart} color={colors.primary}></Button>
          </View>
        </View>
      ) : null} 
    </View>
  );
};



export default ItemDetail;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
  },
  mainContainerLandscape: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 10,
  },
  image: {
    width: "100%",
    height: 250,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },
  textContainer: {
    flexDirection: "column",
  },
  textContainerLandscape: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 10,
  },
  price: {
    textAlign: "right",
    width: "100%",
  },
  imageBase: {
    alignSelf: 'center',
  },
  imagePortrait: {
    width: "100%",
    height: 250,
  },
  imageLandscape: {
    width: "45%",
    height: 200,
  },
});