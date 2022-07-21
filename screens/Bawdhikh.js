import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { auth } from '../firebase'

const Bawdhikh = () => {
    return (
        <ScrollView>
            {auth.currentUser.uid &&
                <View style={{ flex: 1 }}><WebView androidHardwareAccelerationDisabled originWhitelist={['*']}
                    source={{ uri: 'https://rsstvndrapp.herokuapp.com/ganageetham' }}
                    style={{ flex: 1, height: 1200 }}
                />
                </View>
            }
        </ScrollView>
    )
}

export default Bawdhikh

const styles = StyleSheet.create({})