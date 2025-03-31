import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Card from '../Card/Card'

import { colors } from '../../constants/colors'

const CategoryItem = ({category, navigation}) => {
  return (
    <Card >
      <Pressable onPress={() => navigation.navigate('ItemListCategory', {category})}>
        <Text style={styles.text}>{category}</Text>
      </Pressable>
    </Card>
  )
}

export default CategoryItem




/*
(Copiar todo en caso de falla)


const CategoryItem = ({category, selectedCategory = () => {} }) => {
  return (
    <Card >
      <Pressable onPress={() => selectedCategory(category)}>
        <Text style={styles.text}>{category}</Text>
      </Pressable>
    </Card>
  )
}

*/

const styles = StyleSheet.create({
    text: {
        color: colors.tertiary,
        textAlign: 'center',
        fontSize: 20,
    }
})