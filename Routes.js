import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Actions, Router, Scene } from 'react-native-router-flux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { auth, db } from './firebase'
import BloodScreen from './screens/BloodScreen'
import EditProfile from './screens/EditProfile'
import GhoshScreen from './screens/GhoshScreen'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
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
               <Text style={{ top: 80, fontWeight: 'bold', color: 'grey', fontSize: 20, alignItems: 'center', justifyContent: 'center' }}>Sankha Mandir Tvndr App</Text>
               <ActivityIndicator size={80} style={styles.loader} color="orange" />
               <Text style={{ bottom: 60, fontWeight: 'bold', color: 'grey', fontSize: 14, alignItems: 'center', justifyContent: 'center', margin: 1 }}>Loading App Please Wait....</Text>
               <Text style={{ bottom: 50, fontWeight: '400', color: 'grey', fontSize: 14, alignItems: 'center', justifyContent: 'center', margin: 1 }}>Secure Login By <Text style={{ color: '#4287f5' }}>Recaptcha</Text> Verifier and Firebase</Text>
               <Text style={{ bottom: 50, fontWeight: '400', color: 'grey', fontSize: 14, alignItems: 'center', justifyContent: 'center', margin: 2, textAlign: 'center' }}>CopyRight &copy;2022<Text style={{ color: 'orange' }}> Rss Thiruvanvandoor App</Text> Terms and Conditions Applied 2022-2023</Text>

            </View>) : (

               <Router>
                  <Scene key="root">
                     <Scene onEnter={() => auth?.currentUser ? Actions.home() : undefined} key="login" component={LoginScreen} title="Login Page" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold' }} initial={true} />
                     <Scene onEnter={() => auth?.currentUser ? undefined : Actions.login()} key="home" component={HomeScreen} title="Sankha Mandir" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: '#ff5e00' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => signOut(auth).then(() => Actions.login())}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Logout</Text></TouchableOpacity>)} />
                     <Scene key="blood" component={BloodScreen} title="Blood Donation" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: 'red' }} />
                     <Scene key="update" component={UpdateScreen} title="Shakha Updates" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: '#ff5e00' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Actions.home()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Home <FontAwesome5 name="home" /> </Text></TouchableOpacity>)} />
                     <Scene onEnter={() => auth?.currentUser ? undefined : Actions.login()} onExit={() => Actions.home()} key="profile" component={EditProfile} title="User Profile" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: '#ff5e00' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Actions.home()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Home <FontAwesome5 name="home" /> </Text></TouchableOpacity>)} />
                     <Scene key="ghosh" component={GhoshScreen} title="Sankh Gosh" titleStyle={{ justifyContent: 'center', textAlign: 'center', fontWeight: 'bold', color: '#ff5e00' }} renderRightButton={() => (<TouchableOpacity style={{ backgroundColor: '#ff5e00', marginRight: 20, borderRadius: 8, width: 90, height: 34, justifyContent: 'center' }} color="orange" onPress={() => Actions.home()}><Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Home <FontAwesome5 name="home" /> </Text></TouchableOpacity>)} />
                  </Scene>
               </Router>

            )
         }
      </View>

   )

}


const styles = StyleSheet.create({
   loader: {
      zIndex: 10000,
      justifyContent: 'center',
      height: 90,
      marginBottom: 'auto',
      marginTop: 'auto'
   }
})