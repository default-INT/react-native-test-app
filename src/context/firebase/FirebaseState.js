import React, {useReducer} from "react";
import { ADD_CAR, UPDATE_CAR, FETCH_CARS, REMOVE_CAR } from '../types'
import {FirebaseContext} from "./firebaseContext";
import {firebaseReducer} from "./firebaseReducer";
import {Alert} from "react-native";

const url = 'https://lab-8-nap.firebaseio.com/'

export const FirebaseState = ({children}) => {
    const initialState = {cars: []}
    const [state, dispatch] = useReducer(firebaseReducer, initialState)
    const fetchCars = async () => {
        try {
            const response = await fetch(`${url}/cars.json`)
            if (!response.ok) {
                throw new Error('fetch not success, status: ' + response.status)
            }
            const cars = await response.json()
            const payload = Object.keys(cars).map(key => ({
                ...cars[key],
                id: key})
            )
            dispatch({type: FETCH_CARS, payload})
        } catch (e) {
            Alert.alert(e.toString())
        }
    }
    const addCar = async car => {
        try {
            const response = await fetch(`${url}/cars.json`, {
                method: 'POST',
                body: JSON.stringify(car)
            })
            if (!response.ok) {
                throw new Error('add car not success, status: ' + response.status)
            }
            const result = await response.json()
            const payload = {
                ...car,
                id: result.name
            }
            dispatch({type: ADD_CAR, payload})
        } catch (e) {
            Alert.alert(e.toString())
        }
    }
    const removeCar = async car => {
        const response = await fetch(`${url}/cars/${car.id}.json`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            throw new Error('add car not are success, status: ' + response.status)
        }
        dispatch({type: REMOVE_CAR, payload: car})
    }
    const updateCar = async car => {
        const response = await fetch(`${url}/cars/${car.id}.json`, {
            method: 'PUT',
            body: JSON.stringify(car)
        })
        const result = await response.json();
        if (!response.ok) {
            throw new Error('add car not are success, status: ' + response.status)
        }
        dispatch({type: UPDATE_CAR, payload: car})
    }

    return (
        <FirebaseContext.Provider value={{
            fetchCars, addCar, removeCar, updateCar,
            cars: state.cars
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}