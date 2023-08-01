// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, ScrollView, Button, Text, View, TextInput } from 'react-native';
import { Timer } from './components/Timer';

export default function App() {
  const [changeText, setChangeText] = useState(0)
  const [readTime, setReadTime] = useState(0)

  return (
    <ScrollView style={{paddingTop: 50}}>
      <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 48}}>Pomodoro Timer</Text>
      <View style={styles.container}>
        <View>
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => {
                  if (!isNaN(value) && value === "") {
                    value = "0"
                  }
                  setChangeText(parseInt(value))
                }}
                placeholder="Enter break time in minutes"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.textInput}
                onChangeText={(value) => {
                  if (!isNaN(value) && value === "") {
                    value = "0"
                  }
                  setReadTime(parseInt(value))
                }}
                placeholder="Enter Time before break in minutes"
                keyboardType="numeric"
            />
        </View>
        <Timer readTime={readTime} changeText={changeText} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
        height: 40,
        marginHorizontal: 20,
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    }
});
