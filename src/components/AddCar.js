import React, {useContext, useState} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Alert} from "react-native";
import {boxShadow} from "../styles/defaultStyles";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const AddCar = () => {
    const { addCar } = useContext(FirebaseContext)

    const [model, setModel] = useState('')
    const [power, setPower] = useState('')
    const [price, setPrice] = useState('')
    const [carColor, setCarColor] = useState('')

    const addCarClick = () => {
        try {
            if (model.trim() === '') {
                throw new Error('Введите марку автомобиля!')
            }
            if (power.trim() === '') {
                throw new Error('Введите мощность автомобиля!')
            }
            if (price.trim() === '') {
                throw new Error('Введите стоимость автомобиля!')
            }
            if (carColor.trim() === '') {
                throw new Error('Введите цвет автомобиля!')
            }
            const powerFloat = parseFloat(power)
            const priceFloat = parseFloat(price)
            if (powerFloat <= 0 ) {
                throw new Error('Мощность не может быть отрицательаня или равная нулю')
            }
            if (priceFloat <= 0 ) {
                throw new Error('Стоимость не может быть отрицательаня или равная нулю')
            }
            addCar({
                model, power: powerFloat, price: priceFloat, color: carColor
            })
            setModel('')
            setPower('')
            setPrice('')
            setCarColor('')
            Alert.alert('Автомобиль успешно добавлен')
        } catch (e) {
            Alert.alert(e.toString())
        }
    }

    return (
        <View style={styles.addBlock}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} value={model} onChangeText={setModel} placeholder='Введите марку' />
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={power}
                    onChangeText={setPower}
                    placeholder='Введите мощность'
                />
                <TextInput
                    style={styles.input}
                    keyboardType='numeric'
                    value={price}
                    onChangeText={setPrice}
                    placeholder='Введите стоимость'
                />
                <TextInput style={styles.input} value={carColor} onChangeText={setCarColor} placeholder='Введите цвет' />
            </View>
            <TouchableOpacity onPress={addCarClick}>
                <View style={styles.addBtn}>
                    <Text style={styles.text}>
                        Добавить
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    addBlock: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 2,
        margin: 5,
        ...boxShadow
    },
    inputContainer: {
        alignItems: 'stretch',
        width: '80%'
    },
    input: {
        width: '100%',
        fontSize: 18,
        padding: 4,
        margin: 4,
        borderBottomColor: '#f00',
        borderBottomWidth: 1
    },
    text: {color: '#fff', fontSize: 18},
    addBtn: {
        backgroundColor: '#f00',
        color: '#fff',
        padding: 10,
        margin: 15,
        borderRadius: 10
    }
})