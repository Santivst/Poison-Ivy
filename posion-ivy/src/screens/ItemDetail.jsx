//!ACÁ HAY IMGS


import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

//Intento de arreglar las imagenes
import { images } from "../img/images.js"



//* COMENTADO POR PROPÓSITO DE CLASE 12
//import allProducts from "../data/products.json";
///

//! NUEVO CLASE 12
import { useGetProductsByIdQuery } from "../services/shopServices.js";
///

//! NUEVO AFTERCALSS 04
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/cart/cartSlice.js";
///





const ItemDetail = ({ route, navigation }) => {

  //* COMENTADO POR PROPÓSITO DE CLASE 12
  //const [product, setProduct] = useState(null);
  ///
  
  const [orientation, setHorientation] = useState('portrait');
  const { width, height } = useWindowDimensions();
  const {productId:idSelected} = route.params;


  //! NUEVO CLASE 12
  const {data: product, error, isLoading} = useGetProductsByIdQuery(idSelected)
  ///



  //! NUEVO AFTERCALSS 04
  const dispatch = useDispatch();
///



  useEffect(() => {
    if(width > height) setHorientation("landscape")
    else setHorientation("portrait")
    
  }, [width, height]);



  //* COMENTADO POR PROPÓSITO DE CLASE 12
  // //Encontrar el producto por su id
  // useEffect(()=>{
  // const productSelected = allProducts.find(
  //   (product) => product.id === idSelected
  //   );
  //   setProduct(productSelected);
  // }, [idSelected])
  ///

//!IMPORTANTE
    // Función para obtener la imagen
    const getImage = (imagePath) => {
      const parts = imagePath.split("/");
      const fileName = parts[parts.length - 1]; // Extrae solo el nombre del archivo
      return images[fileName] || null;
    };

    //! NUEVO AFTERCALSS 04
    const handleAddCart = () => {
      dispatch(addCartItem({...product, quantity: 1}))
    }


  return (
    <View>
      <Button onPress={() => navigation.goBack()} title="Go back" />
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }>
          <Image
            source={getImage(product.images[0])}
            resizeMode="cover"
            style={orientation === "portrait" ? styles.image : styles.imageLandscape}
          />
          {/* <Image
            source={{ uri: product.images[0] }}
            resizeMode="cover"
            style={orientation === 'portrait' ? styles.image : styles.imageLandscape}
          /> */}
          <View style={orientation === 'portrait' ? styles.textContainer : styles.textContainerLandscape}> 
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Button title="Add cart" onPress={handleAddCart}></Button>
          </View>
        </View>
      ) : null} 
    </View>
  );
};



/*

(Copiar todo en caso de falla)


const ItemDetail = ({ idSelected, setProductSelected }) => {
  //console.log(idSelected);

  const [product, setProduct] = useState(null);
  const [orientation, setHorientation] = useState('portrait');
  const { width, height } = useWindowDimensions();

  // Landscape = horizontal
  // Portrait = vertical


  useEffect(() => {
    if(width > height) setHorientation("landscape")
    else setHorientation("portrait")
    
  }, [width, height]);

  //console.log(orientation);

  useEffect(()=>{
    //Encontrar el producto por su id
    const productSelected = allProducts.find(
      (product) => product.id === idSelected
    );
    setProduct(productSelected);
  }, [idSelected])

  //console.log(product.images[0]);

  return (
    <View>
      <Button onPress={() => setProductSelected("")} title="Go back" />
      {product ? (
        <View
          style={
            orientation === "portrait"
              ? styles.mainContainer
              : styles.mainContainerLandscape
          }
        >
          <Image
            source={{ uri: product.images[0] }}
            resizeMode="cover"
            style={orientation === 'portrait' ? styles.image : styles.imageLandscape}
          />
          <View style={orientation === 'portrait' ? styles.textContainer : styles.textContainerLandscape}> 
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Button title="Add cart"></Button>
          </View>
        </View>
      ) : null} 
    </View>
  );
};



*/

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
});