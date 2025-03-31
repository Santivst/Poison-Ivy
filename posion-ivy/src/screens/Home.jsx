import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import CategoryItem from '../components/CategoryItems/CategoryItems'

import { colors } from '../constants/colors'


//!Comentado por propósito de la clase 12
// import categories from "../data/categories.json"



//!NUEVO CLASE 12
import { useGetCategoriesQuery } from '../services/shopServices.js'
//


const Home = ({navigation}) => {

    //NUEVO CLASE 12
    const {data: categories, error, isLoading} = useGetCategoriesQuery()
    console.log(categories)
    ///


    return (
        <View style={styles.flatListContainer}>
            <FlatList
            showsVerticalScrollIndicator= {false}
            data={categories}
            renderItem={({item}) => <CategoryItem 
                category={item} 
                navigation={navigation} />} // HAY QUE CAMBIAR EL "<Text></Text>" POR "<CategoryItem />" UNA VEZ ESTÉ TERMINADO
            keyExtractor={element => element}>

            </FlatList>
        </View>
    )
}

/*  (En caso de falla)

const Home = ({setCategorySelected}) => {
    return (
        <View style={styles.flatListContainer}>
            <FlatList
            showsVerticalScrollIndicator= {false}
            data={categories}
            renderItem={({item}) => <CategoryItem 
                category={item} 
                selectedCategory={setCategorySelected} />} // HAY QUE CAMBIAR EL "<Text></Text>" POR "<CategoryItem />" UNA VEZ ESTÉ TERMINADO
            keyExtractor={element => element}>

            </FlatList>
        </View>
    )
}

*/




export default Home

const styles = StyleSheet.create({
    flatListContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.secondary,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    }
})