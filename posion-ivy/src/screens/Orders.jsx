import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import OrderItem from "../components/OrderItem/OrderItem";
import { useGetOrdersQuery } from "../services/shopServices.js";



const OrderScreen = () => {
  const {localId} = useSelector(state => state.auth.value)
  const {data: OrderData, error, isLoading, isSuccess} = useGetOrdersQuery()
  const [ordersFiltered, setOrderFiltered] = useState()

  useEffect(()=>{
    if(isSuccess){
      const responseTransformed = Object.values(OrderData);
      const ordersByUser = responseTransformed.filter( order => order.user === localId)
      setOrderFiltered(ordersByUser)
    }
  },[])


  return (
    <View>
      <FlatList
        data={ordersFiltered}
        keyExtractor={(orderItem) => orderItem.id}
        renderItem={({ item }) => {
          return <OrderItem order={item} />;
        }}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});