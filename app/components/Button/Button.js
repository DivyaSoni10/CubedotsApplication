/**
 * Cart Screen
 */
import React , { useEffect } from 'react';
import { 
    Text, 
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './ButtonStyle';

const button = (props) => {
    if(!props.disabled) {
        return (
            <TouchableOpacity onPress={() => props.onPress && props.onPress()} style={props.lightButton ? styles.lightContainer : styles.container}>
                <Text style={props.lightButton ? styles.lightButtonTitle : styles.buttonTitle}>{props.title}</Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={() => props.onPress && props.onPress()} style={styles.disabledButton}>
                <Text style={styles.buttonTitle}>{props.title}</Text>
            </TouchableOpacity>
        )
    }
}

export default button;