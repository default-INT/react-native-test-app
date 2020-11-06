import React, {useContext, useState} from 'react'
import { Modal, Alert, View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { boxShadow } from '../styles/defaultStyles'
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const ModalCarUpdate = ({car, modalVisible, setModalVisible}) => {
    const {updateCar} = useContext(FirebaseContext)

    const [model, setModel] = useState(car.model)
    const [power, setPower] = useState(car.power.toString())
    const [price, setPrice] = useState(car.price.toString())
    const [carColor, setCarColor] = useState(car.color)

    const updateCarClick = () => {
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
            updateCar({
                id: car.id, model, power: powerFloat, price: priceFloat, color: carColor
            })
            setModel('')
            setPower('')
            setPrice('')
            setCarColor('')
            Alert.alert('Информация о автомобили успешно обновлена!')
            setModalVisible(false)
        } catch (e) {
            Alert.alert(e.toString())
        }
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >
            <ScrollView>
            <View style={styles.centeredView}>
                <View style={styles.inputContainer}>
                    <View style={styles.titleBox}>
                        <Text style={styles.titleText}>Введите новые данные</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text>&#10006;</Text>
                        </TouchableOpacity>
                    </View>
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
                <TouchableOpacity onPress={updateCarClick}>
                    <View style={styles.addBtn}>
                        <Text style={styles.text}>
                            Обновить
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Modal>
)}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 30,
        marginTop: 150,
        backgroundColor: 'white',
        borderRadius: 18,
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
    },
    titleBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    titleText: {
        backgroundColor: '#f00',
        color: 'white',
        padding: 2,
        fontSize: 18,
        fontWeight: 'bold'
    }
})