import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Actions } from 'react-native-router-flux'

const Shakha = () => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView style={{ height: '100%', width: '99%' }}>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Rss Shakha Updates <FontAwesome5Icon name="flag" size={25} /></Text>
                    <Text style={styles.cardText}>Namaste,New Ganageetham,Subhashitham And Amritavachanam Available. Upload Masa Vritham And Shakha Karyakari Details Here</Text>
                    <Text style={styles.cardSubTitle}>Add Shakha Masa Vritham And Karyakari Details</Text>
                    <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Not Available", "Masa Vritham Can Be Available End Of This Month")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Add Masa Vritham</Text></TouchableOpacity>
                </View>

                <View style={styles.card2}>
                    <Text style={styles.cardTitle}>Shakha Baitaks And Rss Ulsav</Text>
                    <Text style={styles.cardText}>Shakha Ulsav Details, Shakha Karyakari, Upasthithdinam</Text>
                    <Text style={styles.cardSubTitle}>Details About Sankh Ulsavs And Shaka Karyakari, Baitaks And Upasthithdinam</Text>
                    <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Not Available", "Masa Vritham Can Be Available End Of This Month")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Karyakari</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Not Available", "Masa Vritham Can Be Available End Of This Month")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Baitak</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Not Available", "Masa Vritham Can Be Available End Of This Month")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Varg</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Not Available", "Masa Vritham Can Be Available End Of This Month")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Guru Dakshina</Text></TouchableOpacity>

                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.card1}>
                        <Text style={[styles.cardTitle, { color: 'black', margin: 10 }]}>Shakha Sharirikh Vishaya </Text>
                        <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Available Soon", "You Will Get A Notification When Available")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Yogasanam</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Available Soon", "You Will Get A Notification When Available")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Dhanda</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Available Soon", "You Will Get A Notification When Available")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Samatha</Text></TouchableOpacity>
                    </View>

                    <View style={styles.card1}>
                        <Text style={[styles.cardTitle, { color: 'black', margin: 10 }]}>Shakha Bawdhikh Vishaya <FontAwesome5Icon name="book" size={15} /></Text>
                        <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Available Soon", "You Will Get A Notification When Available")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Ganageetham</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Available Soon", "You Will Get A Notification When Available")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Subhashitham</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Available Soon", "You Will Get A Notification When Available")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Amritavachanam</Text></TouchableOpacity>
                    </View>
                </View>


            </SafeAreaView>
        </View>
    )
}

export default Shakha

const styles = StyleSheet.create({
    card: {
        height: 'auto',
        width: '98%',
        backgroundColor: '#fa8107',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 4,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        color: 'white'
    },
    card1: {
        height: 'auto',
        width: '98%',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 4,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        color: 'white'
    },
    card2: {
        height: 'auto',
        width: '98%',
        backgroundColor: 'grey',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 5,
        marginBottom: 4,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        color: 'white'
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#fff',
        fontFamily: 'sans-serif',
        margin: 2
    },
    cardText: {
        fontSize: 12,
        color: 'white',
        fontWeight: '600',
        margin: 1,
        textAlign: 'center'
    },
    cardButton: {
        backgroundColor: '#ffa200',
        color: 'white',
        margin: 8,
        borderRadius: 8,
        width: '50%',
        padding: 7,
        textAlign: 'center'
    },
    cardSubTitle: {
        fontSize: 10,
        color: 'white',
        fontWeight: '300',
        margin: 1,
    },
})