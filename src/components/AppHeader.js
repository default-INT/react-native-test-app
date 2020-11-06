import React from 'react'
import {View, StyleSheet, Text} from "react-native";
import { boxShadow } from '../styles/defaultStyles'

export const AppHeader = ({title}) => (
    <View style={styles.header}>
        <Text style={styles.text}>{title}</Text>
    </View>
)

const styles = StyleSheet.create({
    header: {
        flex: 0.6,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        shadowColor: "#000",
        ...boxShadow
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,
        //
        // elevation: 6
    },
    text: {
        fontSize: 25,
        backgroundColor: '#f00',
        fontWeight: 'bold',
        color: 'white',
        padding: 10,
        margin: 10,
        ...boxShadow
    }
})