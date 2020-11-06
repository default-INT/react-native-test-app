import React, {useContext, useEffect, useState} from 'react'
import {ScrollView, StyleSheet, View, FlatList} from "react-native";
import {FirebaseState} from "../context/firebase/FirebaseState";
import {AddCar} from "./AddCar";
import {Car} from "./Car";
import {FirebaseContext} from "../context/firebase/firebaseContext";
import {ModalCarUpdate} from "./ModalCarUpdate";

// const cars = [
//     {
//         id: 'car1',
//         model: 'VW Passat B3',
//         power: 130,
//         price: 550
//     }
// ]

export const Body = () => {
    const { cars, fetchCars } = useContext(FirebaseContext)
    useEffect(() => {
        fetchCars()
    }, [])
    return (
        <View style={styles.body}>
            <ScrollView>
                <AddCar />
                {cars.map(car => (<Car key={car.id} car={car} />))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 4
    }
});