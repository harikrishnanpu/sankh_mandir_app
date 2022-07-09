import { ActivityIndicator, Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DropDownPicker from 'react-native-dropdown-picker'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import MaterialsIcon from 'react-native-vector-icons/MaterialCommunityIcons'


const GhoshScreen = () => {

  const [DropDownOpen, setDropOpen] = useState(false)
  const [ghosh, setGhosh] = useState('');
  const [ghoshPage, setGhoshPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ghoshItem, setGhoshitem] = useState('')

  useEffect(() => {

    const setUser = async () => {
      setLoading(true)
      try {
        const docSnap = await getDoc(doc(db, "Users", auth.currentUser?.uid))
        if (docSnap.data().ghosh) {
          setGhoshitem(docSnap.data().ghosh)
          setLoading(false)
          setGhoshPage(true)
        } else {
          setLoading(false)
        }

      } catch {
        setLoading(false)
        Alert.alert("ERRROR OCCURED")
      }
    }

    setUser()

  }, [ghoshPage])


  const setGhoshItem = async () => {
    setLoading(true)
    try {
      await updateDoc(doc(db, "Users", auth.currentUser?.uid), {
        ghosh: ghosh
      })
      setLoading(false)
      setGhoshPage(true)

    } catch {
      setLoading(false)
      Alert.alert("ERRROR OCCURED")
    }
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', height: '99%' }}>
      {loading && <View style={{ backgroundColor: 'white', height: '100%', width: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
        <Image style={[styles.image1]} source={require('../assets/ghosh.png')} />
        <ActivityIndicator size={60} style={styles.loader} color="orange" />
        <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 20, textAlign: 'center' }}>Fetching Details...</Text>
        <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 14, bottom: 30, position: 'absolute', textAlign: 'center' }}>© 2022 Sankh Mandir App {"\n"} Version: 1.0.3</Text>
      </View>}

      {ghoshPage ?

        <SafeAreaView style={styles.card}>
          <Image style={styles.image} source={require('../assets/ghosh.png')} />
          <Text style={styles.text}>Rss Tvndr Gosh Team <FontAwesome5 name="drum" size={25} /></Text>
          <Text style={styles.subtext}>Namaste,{auth.currentUser?.displayName}You Are Selected As {ghoshItem} Ghosh Vatak Further Updates Will Notify You.. </Text>
          {ghoshItem == "Anak" ? <TouchableOpacity onPress={() => Alert.alert("Sorry, Under Review", "Please Try Again Later")} style={styles.button}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{ghoshItem} <FontAwesome5 name="drum" size={25} /></Text></TouchableOpacity> : <TouchableOpacity onPress={() => Alert.alert("Sorry, Under Review", "Please Try Again Later")} style={styles.button}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>{ghoshItem} <MaterialsIcon name="trumpet" size={25} /></Text></TouchableOpacity>}
          <Text style={styles.subtext1}>Page Under Updation Active Within 10 Days</Text>
          <Text style={{ bottom: 0, fontWeight: '400', color: 'white', fontSize: 10, alignItems: 'center', justifyContent: 'center', margin: 10, textAlign: 'center' }}>&copy; 2022 Sankh Mandir App<Text style={{ color: 'orange' }}> Terms And Conditions Applied</Text> {'\n'} Disclaimer: Verified Users Are Only Acceptable</Text>

        </SafeAreaView>

        : <SafeAreaView style={styles.card}>
          <Image style={styles.image} source={require('../assets/ghosh.png')} />
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.411)', margin: 10, padding: 10, borderRadius: 10 }}>
            <Text style={styles.text}>Rss Tvndr Gosh Team Registertaion <FontAwesome5 name="drum" size={25} /></Text>
            <Text style={styles.subtext
            }>Namaste, {auth.currentUser?.displayName} Welcome To Rss Tvndr Ghosh Team.{"\n"} Select A Ghosh Item For Registeration</Text>
            <Text style={[styles.subtext1, { color: 'grey', fontSize: 18 }]}>Registeration Details</Text>
            <Text style={styles.subtext1}>Name: {auth.currentUser.displayName}</Text>

            <View style={{ width: '90%', margin: 15 }}>
              <DropDownPicker
                containerStyle={{ marginBottom: 15, zIndex: 10 }}
                placeholder="Choose Your Ghosh Item"
                placeholderStyle={{
                  fontWeight: "400"
                }}
                dropDownContainerStyle={{ height: 500, width: 100 }}
                open={DropDownOpen}
                value={ghosh}
                listMode="MODAL"
                modalProps={{
                  animationType: "slide",
                  presentationStyle: 'formSheet'
                }}
                modalContentContainerStyle={{
                  backgroundColor: "white",
                }}
                modalTitleStyle={{
                  fontWeight: "bold",
                  color: '#ff7700'
                }}
                listParentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 'auto'
                }}
                listParentLabelStyle={{
                  fontWeight: "600",
                  borderRadius: 10,
                  padding: 10,
                  margin: 5,
                  color: 'black',
                  textAlign: 'center'

                }}
                itemSeparatorStyle={{
                  margin: 2,
                  backgroundColor: 'black',
                  borderColor: 'orange',
                  borderWidth: 10
                }}
                tickIconStyle={{
                  borderColor: 'black'
                }}
                disabledItemLabelStyle={{
                  color: 'grey',
                  fontWeight: '400',
                  fontSize: 12,
                  textAlign: 'center'
                }}
                disabledItemContainerStyle={{
                  height: 'auto'
                }}
                itemSeparator={false}
                modalTitle="Select Your Ghosh Item"
                closeOnBackPressed={false}
                items={[
                  { label: `Anak `, value: 'Anak' },
                  { label: 'Vamsi', value: 'Vamsi' },
                  { label: 'Shankh', value: 'Shankh' },
                  { label: 'Sring', value: 'Sring' },
                  { label: `Disclaimer: Ghosh Registeration Is One Time Registeration You Cannot Change Your Ghosh Item Future Without Permission`, disabled: false }
                ]}
                setOpen={setDropOpen}
                setValue={setGhosh}
              />
            </View>
          </View>

          <TouchableOpacity onPress={setGhoshItem} style={styles.button}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 15, margin: 5 }}>Next</Text></TouchableOpacity>


          <Text style={{ bottom: 9, fontWeight: '400', color: 'white', fontSize: 10, alignItems: 'center', justifyContent: 'center', margin: 10, textAlign: 'center' }}>&copy; 2022 Sankh Mandir App<Text style={{ color: 'orange' }}> Terms And Conditions Applied</Text> {'\n'} Disclaimer: Verified Users Are Only Acceptable</Text>

        </SafeAreaView>}

    </View>
  )
}

export default GhoshScreen

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
    margin: 5,
  },
  text: {
    color: '#474e5d',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  subtext: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    margin: 4
  },
  subtext1: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    margin: 4
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 2,
    padding: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: 'white',
    width: '98%',
    margin: 5

  },
  button: {
    backgroundColor: '#ffa200',
    color: 'white',
    margin: 20,
    borderRadius: 8,
    padding: 15,
    width: '50%',
    padding: 7,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loader: {
    zIndex: 10000,
    justifyContent: 'center',
    position: 'absolute',
    height: 40,
    marginBottom: 'auto',
    alignItems: 'center',
    marginTop: 'auto'
  },
  image: {
    width: 200,
    height: 130,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
    marginTop: 2
  },
  image1: {
    width: 250,
    height: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
    marginTop: 2
  },
})