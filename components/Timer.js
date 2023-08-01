import { View, Text, ScrollView, TouchableOpacity, Button, StyleSheet, Touchable } from "react-native";
import vibrate from "../utils/vibrate";
import { useState, useRef } from "react";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center',
    },
    timeText: {
        fontSize: 25,
        marginTop: 50,
    },
    control: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: 10,
    },
    buttons: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 20,
        borderRadius: 10,
        color: 'black',
        marginLeft: 5,
    }
})

export const Timer = ({ changeText, readTime }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [currentTime, setCurrentTime] = useState(readTime * 60);
    const intervalRef = useRef(null);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60) //minutes
        const seconds = timeInSeconds % 60 //seconds
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const startTimer = () => {
        if (isRunning) return
        setIsRunning(true)

        intervalRef.current = setInterval(() => {
            setCurrentTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(intervalRef.current)
                    setIsRunning(false)
                    vibrate()
                    return readTime * 60
                }
                return prevTime - 1
            })
        }, 1000)
        vibrate(200)
    }

    const stopTimer = () => {
        clearInterval(intervalRef.current)
        setIsRunning(false)
        vibrate(200)
    }

    const reset = () => { 
        clearInterval(intervalRef.current)
        setIsRunning(false)
        setCurrentTime(readTime * 60)
    }

    const handleSetTime = () => {
        if (!isRunning) {
            setCurrentTime(readTime * 60)
            reset()
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>Reading Time: {formatTime(currentTime)}</Text>
            <Text>Break time set to {changeText} minutes</Text>
            <Button title="Set" onPress={handleSetTime} />
            <View style={styles.control}>
                <TouchableOpacity
                    style={styles.buttons}
                    activeOpacity={0.4}
                    onPress={startTimer}
                ><Text>Start</Text></TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttons}
                    activeOpacity={0.4}
                    onPress={reset}
                ><Text>Reset</Text></TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttons}
                    activeOpacity={0.4}
                    onPress={stopTimer}
                ><Text>Stop</Text></TouchableOpacity>
            </View>
        </View>
    )
}

Timer.propTypes = {
    timeShow: PropTypes.number
}