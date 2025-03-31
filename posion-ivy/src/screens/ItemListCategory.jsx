import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { colors } from '../constants/colors'
import ProductItem from '../components/ProductItem/ProductItem'
import Search from '../components/Search/Search'


//* COMENTADO POR PROPÓSITO DE CLASE 12
// import products from '../data/products.json'
///


//! NUEVO CLASE 12
import { useGetProductsByCategoryQuery } from '../services/shopServices'
///


const ItemListCategory = ({
    route, 
    navigation
}) => {
    const [keyWord, setKeyword] = useState("")
    const [productsFiltered, setProductsFiltered] = useState([])
    const [error, setError] = useState("")

    const {category: categorySelected} = route.params;


    //! NUEVO CLASE 12
    const {data: productsFetched, error: ErrorFromFetched, isLoading} = useGetProductsByCategoryQuery(categorySelected)
    console.log(productsFetched)
    ///



    useEffect(() => {
        const regex = /\d/;
        const hasDigit = regex.test(keyWord);
        // console.log(hasDigit)
        if (hasDigit) {
            setError("No se permiten números en la búsqueda")
            return
        }


        
        //*COMENTADO POR PROPÓSITO DE CLASE 12
        // const productsPrefiltered = products.filter(
        //     (product) => product.category === categorySelected
        // );
        ///

        //! NUEVO CLASE 12
        if (!isLoading && productsFetched) {

            //Solución CHATGPT
            const productsArray = Array.isArray(productsFetched)
            ? productsFetched
            : Object.values(productsFetched);


            //* TODO ESTO FUE MOVIDO HACIA ADENTRO DEL IF
            //Product filtered by name
            const productsFilter = productsArray.filter((product) => //* productsFetched ANTES ERA "productsPrefiltered"
                product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
            );
            setProductsFiltered(productsFilter);
            setError("");
            //* //////
        }


    }, [keyWord, categorySelected, productsFetched, isLoading]); //Últimos 2 son nuevos



    return (
        <View style={styles.flatListContainer}>
            <Search
                error={error}
                onSearch={setKeyword}
                goBack={() => navigation.goBack()}
            />
            <FlatList
                data={productsFiltered}
                renderItem={({ item }) => <ProductItem 
            product={item} 
            navigation={navigation}
            />}
                keyExtractor={(producto) => producto.id}
            />
        </View>
    )
}

export default ItemListCategory


/*
(Copiar todo en caso de falla)

const ItemListCategory = ({
    categorySelected = "",
    setCategorySelected = () => {},
    setItemIdSelected = () => {},
}) => {
    const [keyWord, setKeyword] = useState("")
    const [productsFiltered, setProductsFiltered] = useState([])
    const [error, setError] = useState("")

    useEffect(() => {
        regex = /\d/;
        const hasDigit = (regex.test(keyWord))
        // console.log(hasDigit)
        if (hasDigit) {
            setError("No se permiten números en la búsqueda")
            return
        }

        const productsPrefiltered = products.filter(
            (product) => product.category === categorySelected
        );
        //Product filtered by name
        const productsFilter = productsPrefiltered.filter((product) =>
            product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
        );
        setProductsFiltered(productsFilter);
        setError("");
    }, [keyWord, categorySelected]);



    return (
        <View style={styles.flatListContainer}>
            <Search
                error={error}
                onSearch={setKeyword}
                goBack={() => setCategorySelected("")}
            />
            <FlatList
                data={productsFiltered}
                renderItem={({ item }) => <ProductItem 
            product={item} 
            setItemIdSelected={setItemIdSelected}
            />}
                keyExtractor={(producto) => producto.id}
            />
        </View>
    )
}


*/


















const styles = StyleSheet.create({
    flatListContainer: {
        width: "100%",
        backgroundColor: colors.secondary,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
})