import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import List from '../db.json';
import axios from 'axios';
const ProductsList = ({selectedProducts,setSelectedProducts,isLoading,setIsLoading,list,setList}) => {

  
  

  const onProductSelection = (product) => {
    const isProductExist = selectedProducts.find(e => e.id === product.id)
    console.log("isProduct : ",isProductExist)

    if(isProductExist){
      let array = []
      selectedProducts.forEach(element => {
        if(element.id === product.id) {
          array.push({
            ...element,
            quantity : element.quantity +1
          })
        }else{
          array.push(element)
        }
      });
      setSelectedProducts(array)
    }else{
      setSelectedProducts([{...product,quantity : 1},...selectedProducts])

    }
  }

  
  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? 

        <ActivityIndicator color={"white"} style={styles.indicator}/> :

        list?.map((product,index) => (
          <TouchableOpacity key={index} style={styles.productContainer} onPress={() => onProductSelection(product)}>
              <Text style={styles.productText} numberOfLines={1}>{product.product_name}</Text>
              <Text style={styles.productText}>{product.price}</Text>
          </TouchableOpacity>

        ))}
      </View>
    </ScrollView>
  )
}

export default ProductsList

const styles = StyleSheet.create({
  container : {
    flexDirection : "row",
    alignItems : "center",
    flexWrap : "wrap",
    justifyContent : "space-between"
  },
  productContainer : {
    backgroundColor : "#31363F",
    padding : 10,
    width : 100,
    marginBottom : 10,
    borderRadius : 8,
    borderLeftWidth : 4,
    borderLeftColor : "#7077A1"
    
  },
  productText : {
    fontSize : 14,
    color : "white"
  },
  indicator : {
    flex : 1,
    alignItems : "center",
    justifyContent : "center",
    minHeight : "100%",
    marginTop : "20%"
  }
})