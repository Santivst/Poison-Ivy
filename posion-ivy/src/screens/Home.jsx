import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import CategoryItem from '../components/CategoryItems/CategoryItems'

import categories from "../data/categories.json"
import { colors } from '../constants/colors'

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