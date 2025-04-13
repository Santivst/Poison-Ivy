import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors } from '../../constants/colors'

import Card from '../Card/Card'


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



const styles = StyleSheet.create({
    text: {
        color: colors.tertiary,
        textAlign: 'center',
        fontSize: 20,
    }
})