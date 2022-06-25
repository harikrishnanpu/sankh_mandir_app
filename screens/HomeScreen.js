import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MarqueeText from 'react-native-marquee';
import { auth, db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'


const HomeScreen = () => {

  const [UserName, setUserName] = useState('Loading..');
  const [status, setStatus] = useState('Loading..');

  useEffect(() => {
    async function getSnap() {
      const docSnap = await getDoc(doc(db, "Users", auth.currentUser.uid))
      if (docSnap.exists()) {
        setUserName(docSnap.data().name)
        setStatus(docSnap.data().status)
      }
    }
    getSnap()
  }, [])



  return (

    <View style={{ alignItems: 'center', justifyContent: 'center' }}>


      <SafeAreaView style={{ height: '100%', width: '99%' }}>

        <View style={styles.userCard}>
          <Text style={styles.cardText1}>Namaste, {UserName}</Text>
          <Text style={styles.cardText1}>Status: {status == "Active" ? <Text style={{ color: '#5fff57' }}>Active</Text> : <Text style={{ color: 'red' }}>Busy</Text>}</Text>
          <TouchableOpacity style={{ backgroundColor: 'orange', padding: 6, borderRadius: 5 }} onPress={() => Actions.profile()}><Text style={{ fontWeight: '500', color: 'white' }}>Edit Profile <FontAwesome5Icon name="user-edit" /></Text></TouchableOpacity>
        </View>

        <ScrollView >

          <View style={styles.card}>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} /> Next Karyakari: 12/05/2022 ( Tvndr )</Text>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} /> Next Mandal Varg: 12/05/2022 ( Tvndr )</Text>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} /> Next Mandal Baitakh: 12/05/2022 ( Tvndr )</Text>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} /> Next Mandal Sankhikh: 12/05/2022 ( Tvndr )</Text>
          </View>


          <View style={styles.card1}>
            <Text style={styles.cardTitle}>Blood Donating Swayam Sevakers <FontAwesome name="heartbeat" size={25} /></Text>
            <Text style={styles.cardText}>Namaste, Rashtriya Swayam Seva Sangham Thiruvanvandoor Oragnaising Blood Donating Programme. All The Swayam Sevakers Are Requested To Participate The Programme ..</Text>
            <TouchableOpacity style={styles.cardButton} onPress={() => Actions.blood()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Blood Donaters</Text></TouchableOpacity>
          </View>



          <View style={styles.card2}>
            <Text style={styles.cardTitle}>Shakha Updates <MaterialCommunityIcons size={25} name="email-newsletter" /></Text>

            <View style={{ margin: 5, alignItems: 'center' }}>
              <Text style={styles.cardText}><FontAwesome5 name="bullseye" /> Namaste,Rashtriya Swayam Sewa Sankh Thiruvanvandoor App Published Through Official Website</Text>
              <Text style={styles.cardSubTitle} onPress={() => Linking.openURL('https://rsstvndrapp.herokuapp.com')}>Through Official Website: <Text style={{ color: 'orange', textDecorationLine: 'underline' }}>https://rsstvndrapp.herokuapp.com</Text></Text>
              <MarqueeText
                style={styles.cardSubTitle1}
                delay={1000}
                speed={1}
                marqueeOnStart={true}
                loop={true}
              >
                Namaste, Rashtriya Swayam Sewa Sankh Thiruvanvandoor Sankha Mandir App Is Published In Rss Tvndr Official Website rsstvndrapp.herokuapp.com. App Is Mainly For Rss Thiruvanvandoor Blood Donation Programme
                and Also We Can Study Ghosh.All Thiruvanvandoor Swayamsewakers Can Download This App Through Rss Tvndr Official Website Or Play Store Later
              </MarqueeText>
            </View>

            <View style={{ margin: 5, alignItems: 'center' }}>
              <Text style={styles.cardText}><FontAwesome5 name="bullseye" /> RSS Thiruvanvandoor Blood Donation Programme Started. All Swayam Sewakers are Requested To Participate</Text>
              <Text onPress={() => Actions.blood()} style={styles.cardSubTitle}>Rss Tvndr Blood Donation Programmes: <Text style={{ color: 'orange', textDecorationLine: 'underline' }}>Click Here To See More</Text></Text>
              <MarqueeText
                style={styles.cardSubTitle1}
                delay={1000}
                speed={-1}
                marqueeOnStart={true}
                loop={true}
              >
                RSS Thiruvanvandoor Blood Donation Programme Started. All Swayam Sewakers of Age 18-40 are Requested To Participate In This Programme By Installing Sankha Mandir App Or By Giving Name To Respective Shakha Karyavah
              </MarqueeText>
            </View>
            <TouchableOpacity style={styles.cardButton} onPress={() => Actions.update()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>See More Updates</Text></TouchableOpacity>
          </View>



          <View style={styles.card4}>
            <Text style={styles.cardTitle}> Sankh Gosh Team Tvndr <FontAwesome5 name="drum" size={25} /></Text>
            <Text style={styles.cardText}>Namaste, Rss Thiruvanvandoor Ghosh Team Informations Available. All Informations About Ghosh You Can See Here And Also You Can Buy Ghosh Items Online</Text>
            <Text style={styles.cardSubTitle}>Buy Ghosh Items ( Vamsi, Anak, Shankh ) Online</Text>
            <TouchableOpacity style={styles.cardButton} onPress={() => Actions.ghosh()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>More Informations</Text></TouchableOpacity>
          </View>

          <View style={styles.card5}>
            <Text style={styles.cardTitle}>&copy; 2022 Sankha Mandir App</Text>
            <Text style={styles.cardSubTitle}>Login System Verified With Recaptcha. Verified Users Are Only Acceptable </Text>
          </View>

        </ScrollView>


      </SafeAreaView>
    </View>


  )
}

export default HomeScreen

const styles = StyleSheet.create({
  card: {
    height: 'auto',
    width: '98%',
    backgroundColor: '#fc9003',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 2,
    padding: 10,
    borderRadius: 10,
  },
  card1: {
    height: 'auto',
    width: '98%',
    backgroundColor: 'rgba(222, 16, 29, 0.74)',
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
  card4: {
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
  card2: {
    height: 'auto',
    width: '98%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: 'white'
  },
  card3: {
    height: 'auto',
    width: '98%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 40,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: 'white'
  },
  card5: {
    height: 'auto',
    width: '98%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: 'white'
  },
  userCard: {
    height: 'auto',
    width: '99%',
    backgroundColor: 'grey',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 2,
    padding: 10,
    borderRadius: 10,
    color: 'white'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#fff',
    margin: 2
  },
  cardText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    margin: 1,
    textAlign: 'center'
  },
  cardText1: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    margin: 2,
  },
  cardSubTitle: {
    fontSize: 10,
    color: 'white',
    fontWeight: '300',
    margin: 1,
  },
  cardSubTitle1: {
    fontSize: 10,
    color: 'white',
    fontWeight: '300',
    margin: 2,
    marginBottom: 5
  },
  cardImage: {
    height: 35,
    width: 40,
    margin: 5,
    padding: 5,
    borderRadius: 5
  },
  cardFlag: {
    height: 20,
    width: 20,
    margin: 5,
    padding: 5,
    borderRadius: 5
  },
  cardButton: {
    backgroundColor: '#ffa200',
    color: 'white',
    margin: 8,
    borderRadius: 8,
    width: '50%',
    padding: 7,
    textAlign: 'center'
  }
})