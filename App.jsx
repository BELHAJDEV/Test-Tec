/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductsList from './components/ProductsList';
import ProductView from './components/ProductView';
import axios from 'axios';


function App() {
  
  const [selectedProducts,setSelectedProducts] = useState([])
  const [isLoading,setIsLoading] = useState(false);
  const [inputString,setInputString] = useState("")
  const [list,setList] = useState([])

  const searchFunc = async(text) => {
    
    setInputString(text)

    // const response = await axios.get(`http://localhost:3000/products?product_name_like=${text}`)
    const response = await axios.get(`http://localhost:3000/products`)
    
    let array = response.data.filter(e => e.product_name.startsWith(text))
   
    setList(array)

    if(text === "") await fetchData(false)

  }

  const fetchData = async(withLoading) => {
    if(withLoading) setIsLoading(true)
    const response = await axios.get('http://localhost:3000/products')
  
    setList(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData(true)
  },[])
  
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle={'light-content'}
        backgroundColor={"black"}
      />
      <KeyboardAvoidingView style={{flex : 1,padding : 10}} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={0}>
      
      <ScrollView style={{maxHeight : "50%",minHeight : "50%",borderWidth : 1,borderColor : "white"}}>
        {selectedProducts.map((product,index) => (
          <ProductView 
          product={product} 
          selectedProducts={selectedProducts} 
          setSelectedProducts={setSelectedProducts}
          key={index} 
          
          />
        ))}
      </ScrollView>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
            <AntDesign name='search1' size={23} color={"gray"} />
            <TextInput placeholder='Chercher un produit...' style={styles.input} placeholderTextColor={"gray"} value={inputString} onChangeText={(text) => searchFunc(text)}/>
        </View>
        <TouchableOpacity style={styles.btnContainer} onPress={() => searchFunc(inputString)}>
            <Text style={styles.btnText}>Chercher</Text>
        </TouchableOpacity>
      </View>
      <ProductsList 
        selectedProducts={selectedProducts} 
        setSelectedProducts={setSelectedProducts} 

        isLoading={isLoading}
        setIsLoading={setIsLoading}


        list={list}
        setList={setList}
      />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : "black",
  },
  inputContainer : {
    flexDirection : "row",
    alignItems : "center",
    backgroundColor : "white",
    flex : 1,
    marginRight : 10,
    borderRadius : 20,
    paddingLeft :  10,
    overflow : "hidden"
  },
  searchContainer : {
    flexDirection : "row",
    alignItems : "center",
    marginVertical : 10
  },
  input : {
    backgroundColor : "white",
    height : 45,
    fontSize : 14,
    color : "black",
    flex : 1,
    marginRight : 10
  },
  btnContainer : {
    width : 100,
    height : 45,
    alignItems : 'center',
    justifyContent : "center",
    backgroundColor : "red",
    borderRadius : 20
  },
  btnText : {
    fontSize : 14,
    color : "white"
  },
  productContainer : {
    flexDirection : "row",
    alignItems : "center",
    backgroundColor : "#31363F",
    marginBottom : 10,
    borderRadius : 8,
    borderLeftWidth : 4,
    borderLeftColor : "#7077A1"
  }
});

export default App;
