import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {boxShadow}  from "../styles/defaultStyles"
import {FirebaseContext} from "../context/firebase/firebaseContext";
import {ModalCarUpdate} from "./ModalCarUpdate";

export const Car = ({car}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const {removeCar} = useContext(FirebaseContext)
    return (
        <TouchableOpacity onPress={() => setModalVisible(true)} onLongPress={() => removeCar(car)} >
            <ModalCarUpdate car={car} modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <View style={styles.carBox}>
                <Text style={styles.title}>{car.model}</Text>
                <View style={styles.infoBox}>
                    <Text>Мощность: {car.power} л.с.</Text>
                    <Text>Стоимость: {car.price} $</Text>
                    <Text>Цвет: {car.color}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    carBox: {
        padding: 6,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 5,
        ...boxShadow
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    infoBox: {
        padding: 10,
        paddingLeft: 18
    }
})