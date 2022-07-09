import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, BackHandler, Button, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Actions, Router, Scene } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { auth, db } from './firebase'
import BloodProfile from './screens/BloodProfile'
import BloodScreen from './screens/BloodScreen'
import EditProfile from './screens/EditProfile'
import GhoshScreen from './screens/GhoshScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import Shakha from './screens/Shakha'
import UpdateScreen from './screens/UpdateScreen';



export default function Routes() {


   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const ReloadUser = async () => {
         if (auth.currentUser) {
            const DocSnap = await getDoc(doc(db, "Users", auth.currentUser.uid));
            onAuthStateChanged(auth, (user) => {
               if (user) {
                  if (DocSnap.exists()) {
                     setLoading(false)
                     Actions.home()
                  } else {
                     setLoading(false)
                  }
               } else {
                  setLoading(false)
                  Actions.login()
               }
            })
         } else {
            onAuthStateChanged(auth, async (user) => {
               if (user) {
                  const DocSnap = await getDoc(doc(db, "Users", auth.currentUser.uid));
                  if (DocSnap.exists()) {
                     setLoading(false)
                     Actions.home()
                  } else {
                     setLoading(false)
                  }
               } else {
                  setLoading(false)
                  Actions.login()
               }
            })
         }
      }


      ReloadUser();
   }, [])



   return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
         {loading ?
            (<View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
               <Text style={{ top: 90, fontWeight: 'bold', color: 'grey', fontSize: 20, alignItems: 'center', justifyContent: 'center' }}>Sankha Mandir Tvndr App</Text>
               <Image style={styles.image} source={require('./assets/splash.png')} />
               <ActivityIndicator size={40} style={styles.loader} color="orange" />
               <Text style={{ bottom: 60, fontWeight: 'bold', color: 'grey', fontSize: 14, alignItems: 'center', justifyContent: 'center', margin: 1 }}>Loading App Please Wait....</Text>
               <Text style={{ bottom: 50, fontWeight: '400', color: 'grey', fontSize: 14, alignItems: 'center', justifyContent: 'center', margin: 1 }}>Secure Login By <Text style={{ color: '#4287f5' }}>Recaptcha</Text> Verifier and Firebase</Text>
               <Text style={{ bottom: 50, fontWeight: '400', color: 'grey', fontSize: 14, alignItems: 'center', justifyContent: 'center', margin: 2, textAlign: 'center' }}>&copy;2022<Text style={{ color: 'orange' }}> Sankh Mandir App 1.0.2 {"\n"}</Text> Terms and Conditions Applied 2022-2023</Text>

            </View>) : (

               <Router>
                  <Scene key="root">
                     <Scene onEnter={() => auth?.currentUser ? Actions.home() : undefined} key="login" component={LoginScreen} title="Login Page" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }} initial={false} />
                     <Scene onEnter={() => auth?.currentUser ? undefined : Actions.login()} key="home" component={HomeScreen} title="Sankha Mandir" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: '#ff5e00' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Alert.alert(
                        "Want To Exit",
                        "Are You Sure Want To Exit From The App",
                        [
                           {
                              text: "Exit App",
                              onPress: () => BackHandler.exitApp(),
                           },
                           {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                           },
                        ]
                     )}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Exit</Text></TouchableOpacity>)} />
                     <Scene key="blood" component={BloodScreen} title="Blood Donation" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: 'red' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Actions.home()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Home <FontAwesome5 name="home" /> </Text></TouchableOpacity>)} />
                     <Scene key="update" component={UpdateScreen} title="Shakha Updates" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: '#ff5e00' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Actions.home()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Home <FontAwesome5 name="home" /> </Text></TouchableOpacity>)} />
                     <Scene onEnter={() => auth?.currentUser ? undefined : Actions.login()} onExit={() => Actions.home()} key="profile" component={EditProfile} title="User Profile" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: '#ff5e00' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Actions.home()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Home <FontAwesome5 name="home" /> </Text></TouchableOpacity>)} />
                     <Scene key="ghosh" component={GhoshScreen} title="Sankh Gosh" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: '#ff5e00' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Actions.home()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Home <FontAwesome5 name="home" /> </Text></TouchableOpacity>)} />
                     <Scene key="bloodprofile" component={BloodProfile} title="Blood Donator Profile" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: 'red' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Actions.home()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Home <FontAwesome5 name="home" /> </Text></TouchableOpacity>)} />
                     <Scene key="shakha" component={Shakha} title="Shakha" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: '#ff5e00' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Actions.home()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Home <FontAwesome5 name="home" /> </Text></TouchableOpacity>)} />
                  </Scene>
               </Router>

            )
         }
         <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      </View>

   )

}


const styles = StyleSheet.create({
   loader: {
      zIndex: 10000,
      justifyContent: 'center',
      height: 50,
      alignItems: 'center',
      margin: 80
   },
   image: {
      width: 400,
      height: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
      marginBottom: 2,
      marginTop: '45%'
   },
})