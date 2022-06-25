import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import  MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MarqueeText from 'react-native-marquee';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Actions } from 'react-native-router-flux'



const UpdateScreen = () => {
  return (
    <View>

<ScrollView>

    <View style={styles.card}>
      <Text style={styles.cardTitle}>New Updates <Entypo size={24} name="bell" /></Text>
      <Text style={styles.cardText}><FontAwesome5 name="bullseye" /> Namaste,Rashtriya Swayam Sewa Sankh Thiruvanvandoor App Published Through Official Website. App Is Publishing on Playstore Soon <Entypo name="google-play" /></Text>
    </View>


  
    <View style={styles.card2}>
    <Text style={styles.cardTitle}>All Shakha Updates  <MaterialCommunityIcons size={25} name="bell" /></Text>


    <View style={{margin: 5,alignItems: 'center'}}>
    <Text style={styles.cardText}><FontAwesome5 name="bullseye" /> Namaste,Rashtriya Swayam Sewa Sankh Thiruvanvandoor App Published Through Official Website</Text>
    <Text style={styles.cardSubTitle} onPress={()=> Linking.openURL('https://rsstvndrapp.herokuapp.com')}>Through Official Website: <Text style={{color:'orange', textDecorationLine:'underline'}}>https://rsstvndrapp.herokuapp.com</Text></Text>
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




    <View style={{margin: 5,alignItems: 'center'}}>
    <Text style={styles.cardText}><FontAwesome5 name="bullseye" /> Namaste,Rashtriya Swayam Sewa Sankh Thiruvanvandoor Blood Donation Programme Started. All Swayam Sewakers are Requested To Participate</Text>
    <Text style={styles.cardSubTitle} onPress={()=> Actions.blood()}>Through Sankh Mandir App: <Text style={{color:'red', textDecorationLine:'underline'}}>Blood Donation Page</Text></Text>
    <MarqueeText
          style={styles.cardSubTitle1}
          delay={1000}
          speed={1}
          marqueeOnStart={true}
          loop={true}
        >
          RSS Thiruvanvandoor Blood Donation Programme Started. All Swayam Sewakers are Requested To Participate.RSS Thiruvanvandoor Blood Donation Programme Started. All Swayam Sewakers of Age 18-40 are Requested To Participate In This Programme By Installing Sankha Mandir App Or By Giving Name To Respective Shakha Karyavah
        </MarqueeText>
    </View>




    <View style={{margin: 5,alignItems: 'center'}}>
    <Text style={styles.cardText}><FontAwesome5 name="bullseye" /> Rashtriya Swayam Sewa Sankh Thiruvanvandoor App Name: Sankha Mandir <Entypo name="google-play" /></Text>
    <Text style={styles.cardSubTitle} onPress={()=> Linking.openURL('https://rsstvndrapp.herokuapp.com')}>Download and Share App Through Official Website: <Text style={{color:'orange', textDecorationLine:'underline'}}>https://rsstvndrapp.herokuapp.com</Text></Text>
    </View>



       <View style={{margin: 5,alignItems: 'center'}}>
    <Text style={styles.cardText}><FontAwesome5 name="bullseye" /> Rashtriya Swayam Sewa Sankh Thiruvanvandoor App Name Fixed : Sankha Mandir</Text>
    <Text style={styles.cardSubTitle} onPress={()=> Linking.openURL('https://rsstvndrapp.herokuapp.com')}> App Is Comming On Play Store <Entypo name="google-play" /> Soon.. <Text style={{color:'whitejkiuytheihriuyiyeifyofipewurfu234oripy498ruopwjtpuwe[0ifjj'}}>Under Review</Text></Text>
    </View>


    <View style={{margin: 5,alignItems: 'center'}}>
    <Text style={styles.cardText}><FontAwesome5 name="bullseye" /> More Updates Loading...</Text>
    </View>


    </View>


    <View style={{alignItems: 'center', width: '98%', margin: 5}}>
      <Text style={{color: 'grey', textAlign: 'center', fontSize: 10,}}>Disclaimer: Neither Sankha Mandir App nor Sankha Karyakarthakkal is responsible for any inadvertent error that may have crept in the updates being published on net.</Text>
    </View>


</ScrollView>
    </View>
  )
}

export default UpdateScreen

const styles = StyleSheet.create({
  card:{
    height: 'auto',
    width: '96%',
    backgroundColor: '#fc9003',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 18,
    marginBottom: 5,
    padding: 18,
    borderRadius: 10,
    color: 'white',
  },
  card1:{
    height: 'auto',
    width: '96%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center', 
    textAlign: 'center',
    alignItems: 'center',
    color: 'white'
  },
  card2:{
    height: 'auto',
    width: '96%',
    backgroundColor: 'grey',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center', 
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
  },
  cardTitle:{
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
    margin: 2,
    alignItems: 'center',
  },
  cardTitle1:{
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    margin: 2
  },
  cardText:{
    fontSize: 13,
    color: 'white',
    fontWeight: '600',
    margin: 1, 
    textAlign:'center'
  },     
   cardSubTitle:{
    fontSize: 10,
    color: 'white',
    fontWeight: '300',
    margin: 1,
    textAlign: 'center'
  },
  cardSubTitle1:{
    fontSize: 10,
    color: 'white',
    fontWeight: '300',
    margin: 2,
    marginBottom: 5,
    textAlign: 'center'
  },
})