import { Linking, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';

const BloodProfile = ({ uid }) => {

    const [User, setUser] = useState({});

    useEffect(() => {
        const getSnap = async () => {
            const snapShot = await getDoc(doc(db, "Users", uid));
            setUser(snapShot.data())
        };
        getSnap();
    }, []);


    return (
        <SafeAreaView>
            <View style={styles.card}>
                <Text onPress={() => Linking.openURL('tel:7306899364')} style={{ textAlign: 'left', marginRight: 'auto', color: 'white', fontWeight: 'bold', fontSize: 16, margin: 8 }}><MaterialsIcon name="help-circle" size={20} /> Help</Text>
                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.411)', borderRadius: 10, padding: 20, margin: 6, marginTop: 15 }} >
                    <Text style={[styles.title, { color: 'white', marginBottom: 1, margin: 2 }]}>Sankh <Text style={{ color: 'orange' }}>Mandir</Text> App</Text>
                    <Text style={styles.title}>Donator's Personal Informations</Text>
                    <Text style={styles.subTitle}>Name: {User.name}</Text>
                    <Text style={styles.subTitle}>Blood Group: <Text style={{ color: 'white' }}>{User.blood}</Text></Text>
                    <Text style={styles.subTitle}>Status: <Text style={{ color: '#5fff57' }}>{User.status}</Text></Text>
                    <Text style={styles.subTitle}>Blood Donated: {User.bloodDonated}</Text>
                    <Text style={{ fontSize: 10, color: 'black', fontWeight: '600', margin: 5, textAlign: 'center', backgroundColor: 'white', padding: 10, borderRadius: 10, margin: 8 }}>Warning: Do Not Over Disturb The Donator If  Any Report From The Donator Against You May Subjected To Fine Or Account Deletion From App</Text>
                </View>
                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${User.phone.slice(3)}`); }} style={{ backgroundColor: 'orange', borderRadius: 10, padding: 12, margin: 10, marginBottom: 4, paddingHorizontal: 70 }}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Call Now <FontAwesome5Icon name="phone" size={15} /></Text></TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`whatsapp://send?phone=7306899364&text=Connect: ${User.name} \n Id: ${auth.currentUser.uid}`)} style={{ backgroundColor: 'green', borderRadius: 10, padding: 12, margin: 10, marginBottom: 18, paddingHorizontal: 55 }}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Send Message <FontAwesome5Icon name="whatsapp" size={15} /></Text></TouchableOpacity>
                <Text style={{ fontSize: 10, color: 'white', margin: 2, textAlign: 'center', fontWeight: 'bold' }}>© 2022 Sankh Mandir App <Text onPress={() => Linking.openURL('https://rsstvndrapp.herokuapp.com/privacy-policies')} style={{ color: "orange" }}>Terms And Conditions</Text> Applied</Text>
                <Text style={{ fontSize: 10, textAlign: 'center', margin: 5, color: 'white' }}>Disclaimer: App Is Verifying You, If Any InSecurity Occur Your Account May Be Deleted Or Disabled For Specific Time. Any Report From The Donator May Subjected To Fine Or Account Deletion, Speak To The Donators In Good Way</Text>

            </View>
            <FirebaseRecaptchaBanner style={styles.recaptcha} textStyle={{ textAlign: 'center', color: 'black' }} />
        </SafeAreaView>
    )
}

export default BloodProfile

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'grey',
        borderRadius: 15,
        padding: 10,
        margin: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#474e5d',
        margin: 5,
        textAlign: 'center'
    },
    subTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 6,
        color: 'white'
    },
    recaptcha: {
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
})