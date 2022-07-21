import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Linking, ScrollView, SafeAreaView, Modal, BackHandler, Animated, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Actions } from 'react-native-router-flux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MarqueeText from 'react-native-marquee';
import { auth, db } from '../firebase'
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {
  TourGuideProvider,// Main provider
  TourGuideZone, // Main wrapper of highlight component
  TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
  useTourGuideController, // hook to start, etc.
} from 'rn-tourguide';
import * as Updates from "expo-updates";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


async function sendWelcomePushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Namaste, Welcome To Sankh Mandir App',
    body: 'You Are Now A Part Of Rss Thiruvanvandoor Rudram Blood Donation Programm 👍',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  }).then(async () => {
    await updateDoc(doc(db, "Users", auth.currentUser.uid), {
      isFirst: false
    })
    console.log("Message Sent Successfully");
  })
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    if (token) {
      await updateDoc(doc(db, "Users", auth.currentUser?.uid), {
        expoToken: token
      })
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#ffaa00',
    });
  }

  return token;
}

const openPlayStore = () => {
  return Alert.alert(
    "APP UPDATE",
    "App Update Available, Please Update Your Current Version: 1.0.4 to 1.0.5",
    [{ text: "UPDATE", onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=com.hari.sankh_mandir') }],
    { cancelable: false }
  );
};

const updateversion = async () => {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      // ... notify user of update ...
      Updates.reloadFromCache();
      await Updates.reloadAsync();
      openPlayStore();
    }
    props.onFinish();
  } catch (e) {
    console.log(e);
  }
};


const HomeScreen = () => {
  return (
    <TourGuideProvider preventOutsideInteraction >
      <HomeScreenComPonent />
    </TourGuideProvider>
  )
}


const HomeScreenComPonent = () => {

  const [UserName, setUserName] = useState('Loading..');
  const [status, setStatus] = useState('Loading..');
  const [ghosh, setGhosh] = useState(null);
  const {
    start, // a function to start the tourguide
    stop, // a function  to stopping it
    eventEmitter, // an object for listening some events
  } = useTourGuideController();

  useEffect(() => {
    updateversion();
  }, []);

  useEffect(() => {
    (() => registerForPushNotificationsAsync())();
  }, []);


  useEffect(() => {
    async function getSnap() {
      const docSnap = await getDoc(doc(db, "Users", auth.currentUser.uid))
      if (docSnap.exists()) {
        setUserName(docSnap.data().name)
        setStatus(docSnap.data().status)
        if (docSnap.data().ghosh) {
          setGhosh(docSnap.data().ghosh)
        }
      }
    }
    getSnap()

  }, []);


  useEffect(() => {
    async function sendMessage() {
      const docSnap = await getDoc(doc(db, "Users", auth.currentUser.uid))
      if (docSnap.data().isFirst) {
        if (docSnap.data().expoToken) {
          await sendWelcomeNotification(docSnap.data().expoToken).then(() => {
            console.log("Message Fired 🚒");
          })
        } else {
          console.log("Token Not Found");
        }
      }
    }


    setTimeout((() => sendMessage()), 15000)
  }, []);


  const handleOnStart = () => console.log('start')
  const handleOnStop = () => console.log('stop')
  const handleOnStepChange = () => console.log(`stepChange`)

  useEffect(() => {
    eventEmitter.on('start', handleOnStart)
    eventEmitter.on('stop', handleOnStop)
    eventEmitter.on('stepChange', handleOnStepChange)

    return () => {
      eventEmitter.off('start', handleOnStart)
      eventEmitter.off('stop', handleOnStop)
      eventEmitter.off('stepChange', handleOnStepChange)
    }
  }, []);



  const sendWelcomeNotification = async (token) => {
    await sendWelcomePushNotification(token);
  }

  const sendNotificationToAllUsers = async () => {
    const users = await getDocs(collection(db, "Users"))
    users.forEach(async (user) => await sendPushNotification(user.data().expoToken))
  }


  return (

    <View style={{ alignItems: 'center', justifyContent: 'center' }}>


      <SafeAreaView style={{ height: '100%', width: '99%' }}>

        <View style={styles.userCard}>
          <Text style={styles.cardText1}>Namaste, {UserName}</Text>
          <Text style={styles.cardText1}>Status: {status == "Active" ? <Text style={{ color: '#5fff57' }}>Active</Text> : <Text style={{ color: 'red' }}>Busy</Text>}</Text>
          <TouchableOpacity style={{ backgroundColor: '#fc9003', padding: 6, borderRadius: 5 }} onPress={() => Actions.profile()}><Text style={{ fontWeight: '500', color: 'white' }}>Edit Profile <FontAwesome5Icon name="user-edit" /></Text></TouchableOpacity>
        </View>

        <ScrollView >

          <View style={styles.card} >
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} />  Gurudhakhsina Tvndr: 24/07/2022 <Animated.Text style={{ color: 'green', fontSize: 10, fontWeight: '700' }}> New</Animated.Text></Text>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} />  Gurudhakhsina Mazkr: 31/07/2022 <Text style={{ color: 'green', fontSize: 10, fontWeight: '700' }}> New</Text></Text>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} />  Gurudhakhsina Ermlk: 24/07/2022 <Text style={{ color: 'green', fontSize: 10, fontWeight: '700' }}> New</Text></Text>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} />  Gurudhakhsina Nanadu: 24/07/2022 <Text style={{ color: 'green', fontSize: 10, fontWeight: '700' }}> New</Text></Text>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} />  Gurudhakhsina Mepram: 31/07/2022 <Text style={{ color: 'green', fontSize: 10, fontWeight: '700' }}> New</Text></Text>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} />  Gurudhakhsina Umytk: 31/07/2022 <Text style={{ color: 'green', fontSize: 10, fontWeight: '700' }}> New</Text></Text>
            <Text style={styles.cardTitle}><Image style={styles.cardFlag} source={require('../assets/flag.png')} />  Gurudhakhsina Vanvtk: 24/07/2022 <Text style={{ color: 'green', fontSize: 10, fontWeight: '700' }}> New</Text></Text>


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
              <Text style={styles.cardSubTitle} onPress={() => Linking.openURL('https://rsstvndrapp.herokuapp.com')}>Through Official Website: <Text style={{ color: '#fc9003', textDecorationLine: 'underline' }}>https://rsstvndrapp.herokuapp.com</Text></Text>
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
              <Text onPress={() => Actions.blood()} style={styles.cardSubTitle}>Rss Tvndr Blood Donation Programmes: <Text style={{ color: '#fc9003', textDecorationLine: 'underline' }}>Click Here To See More</Text></Text>
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
            <Text style={styles.cardText}>Rss Thiruvanvandoor Ghosh Team Informations Available. All Informations About Ghosh You Can See Here And Also You Can Buy Ghosh Items Online</Text>
            <Text style={styles.cardSubTitle}>Buy Ghosh Items ( Vamsi, Anak, Shankh ) Online</Text>
            {ghosh ? <TouchableOpacity style={styles.cardButton} onPress={() => Actions.ghosh()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Sankh Gosh</Text></TouchableOpacity> : <TouchableOpacity style={styles.cardButton} onPress={() => Actions.ghosh()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Register</Text></TouchableOpacity>}
          </View>

          <View style={styles.card6}>
            <Text style={styles.cardTitle}>Rss Shakha <FontAwesome5 name="flag" size={25} /></Text>
            <Text style={styles.cardText}>All Rss Shaka Updates, Ganageetham, Subhashitham, Amritavachanam And Other Shakha Informations Available</Text>
            <Text style={styles.cardSubTitle}>Masa Vritham And Karyakari Informations</Text>
            <TouchableOpacity style={styles.cardButton} onPress={() => Actions.shakha()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Shakha</Text></TouchableOpacity>
          </View>

          <View style={styles.card5}>
            <Text style={styles.cardTitle}>&copy; 2022 Sankha Mandir App</Text>
            <Text style={styles.cardSubTitle}>Login System Verified With Recaptcha. Verified Users Are Only Acceptable </Text>
          </View>

        </ScrollView>

        <TourGuideZoneByPosition
          zone={1}
          shape={'rectangle'}
          isTourGuide
          top={10}
          height={140}
          width={'100%'}
          text="In This Section You Can See Next Karyakari, Mandal Baitak, Mandal Sankhik And Other Important Days"
        />


        <TourGuideZoneByPosition
          zone={2}
          shape={'rectangle'}
          isTourGuide
          top={150}
          height={140}
          width={'100%'}
          text="In This Section You Can See Rss Tvndr Blood Donation Prg And Blood Donaters"
        />

        <TourGuideZoneByPosition
          zone={3}
          shape={'rectangle'}
          isTourGuide
          top={-40}
          right={8}
          height={40}
          width={110}
          text="In This Button You Can Edit Your Profile"
        />

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
  card6: {
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