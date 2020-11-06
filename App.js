import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {AppHeader} from "./src/components/AppHeader";
import {AddCar} from "./src/components/AddCar";
import {FirebaseState} from "./src/context/firebase/FirebaseState";
import {Body} from "./src/components/Body";

export default function App() {
  return (
    <FirebaseState>
      <View style={styles.container}>
        <AppHeader title="CarService" />
          <Body/>
          <StatusBar style="auto" />
      </View>
    </FirebaseState>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'whitesmoke'
  },
  body: {
    flex: 4
  }
});
