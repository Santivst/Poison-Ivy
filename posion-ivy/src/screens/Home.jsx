import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { colors } from '../constants/colors'

import CategoryItem from '../components/CategoryItems/CategoryItems'
import { useGetCategoriesQuery } from '../services/shopServices.js'



const Home = ({navigation}) => {
    const {data: categories, error, isLoading} = useGetCategoriesQuery()

    return (
        <View style={styles.flatListContainer}>
            <FlatList
            showsVerticalScrollIndicator= {false}
            data={categories}
            renderItem={({item}) => <CategoryItem 
                category={item} 
                navigation={navigation} />}
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