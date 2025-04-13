import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { colors } from '../constants/colors'
import ProductItem from '../components/ProductItem/ProductItem'
import Search from '../components/Search/Search'
import { useGetProductsByCategoryQuery } from '../services/shopServices'



const ItemListCategory = ({
    route, 
    navigation
}) => {
    const [keyWord, setKeyword] = useState("")
    const [productsFiltered, setProductsFiltered] = useState([])
    const [error, setError] = useState("")
    const {category: categorySelected} = route.params;
    const {data: productsFetched, error: ErrorFromFetched, isLoading} = useGetProductsByCategoryQuery(categorySelected)

    useEffect(() => {
        const regex = /\d/;
        const hasDigit = regex.test(keyWord);
        if (hasDigit) {
            setError("No se permiten números en la búsqueda")
            return
        }
        if (!isLoading && productsFetched) {
            const productsArray = Array.isArray(productsFetched)
            ? productsFetched
            : Object.values(productsFetched);

            const productsFilter = productsArray.filter((product) =>
                product.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
            );
            setProductsFiltered(productsFilter);
            setError("");
        }
    }, [keyWord, categorySelected, productsFetched, isLoading]);



    return (
        <View style={styles.flatListContainer}>
            <Search
                error={error}
                onSearch={setKeyword}
                goBack={() => navigation.goBack()}
            />
            <FlatList
                showsVerticalScrollIndicator= {false}
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