import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const ProductView = ({product,selectedProducts,setSelectedProducts}) => {
  

  const decrement = () => {
    if(product.quantity - 1 > 0) {
      
      let array = []
      selectedProducts.forEach(element => {
        if(element.id === product.id) {
          array.push({
            ...element,
            quantity : element.quantity - 1
          })
        }else{
          array.push(element)
        }
      });
      setSelectedProducts(array)
    
    }
  }
  const increment = () => {
    
     let array = []
      selectedProducts.forEach(element => {
        if(element.id === product.id) {
          array.push({
            ...element,
            quantity : element.quantity + 1
          })
        }else{
          array.push(element)
        }
      });
      setSelectedProducts(array)
  }
  
  return (
    <View style={styles.productContainer}>
      <View style={{flex : 1,justifyContent :"space-between"}}>
        <Text style={styles.text}>{product.product_name}</Text>
        <Text style={styles.text}>{product.quantity} * {product.price} DH/u</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={decrement} disabled={product.quantity === 1}>
          <Text style={styles.text}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{product.quantity}</Text>
        <TouchableOpacity style={styles.btn} onPress={increment}>
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ProductView

const styles = StyleSheet.create({
  productContainer : {
    flexDirection : "row",
    backgroundColor : "#31363F",
    padding : 10,
    marginBottom : 10,
    borderRadius : 8,
    borderLeftWidth : 4,
    borderLeftColor : "#7077A1",
    margin : 10
  },
  text : {
    fontSize : 16,
    color : "white"
  },
  row : {
    flexDirection :"row",
    alignItems :"center"
  },
  btn : {
    width : 50,
    height : 50,
    alignItems : "center",
    justifyContent : "center",
    borderRadius : 8,
    borderWidth : 1,
    borderColor : "white"
  },
  quantity : {
    fontSize : 18,
    fontWeight : "500",
    marginHorizontal : 10,
    color : "white",
    width : 20,
    textAlign : "center"
    
  }
})