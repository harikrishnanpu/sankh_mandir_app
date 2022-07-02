import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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
  const [loading, setLoading] = useState(false);
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
      {loading && <ActivityIndicator size={80} style={styles.loader} color="orange" />}

      {ghoshPage ?

        <SafeAreaView style={styles.card}>

          <Text style={styles.text}>Rss Tvndr Gosh Team <FontAwesome5 name="drum" size={25} /></Text>
          <Text style={styles.subtext}>Namaste, {auth.currentUser?.displayName} You Are Selected As {ghoshItem} Ghosh Vatak Further Updates Will Notify You.. </Text>
          {ghoshItem == "Anak" ? <TouchableOpacity onPress={() => Alert.alert("Sorry, Under Review", "Please Try Again Later")} style={styles.button}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>{ghoshItem} <FontAwesome5 name="drum" size={25} /></Text></TouchableOpacity> : <TouchableOpacity onPress={() => Alert.alert("Sorry, Under Review", "Please Try Again Later")} style={styles.button}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>{ghoshItem} <MaterialsIcon name="trumpet" size={25} /></Text></TouchableOpacity>}
          <Text style={{ bottom: 0, fontWeight: '400', color: 'white', fontSize: 10, alignItems: 'center', justifyContent: 'center', margin: 10, textAlign: 'center' }}>&copy; 2022 Sankh Mandir App<Text style={{ color: 'orange' }}> Terms And Conditions Applied</Text> {'\n'} Disclaimer: Verified Users Are Only Acceptable</Text>

        </SafeAreaView>

        : <SafeAreaView style={styles.card}>
          <Text style={styles.text}>Rss Tvndr Gosh Team Registertaion <FontAwesome5 name="drum" size={25} /></Text>
          <Text style={styles.subtext
          }>Namaste, {auth.currentUser?.displayName} Welcome To Rss Tvndr Ghosh Team. Select A Ghosh Item For Registeration</Text>

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
                margin: 2
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
              itemSeparator={true}
              modalTitle="Select Your Ghosh Item"
              closeOnBackPressed={true}
              items={[
                { label: `Anak `, value: 'Anak' },
                { label: 'Vamsi', value: 'Vamsi' },
                { label: 'Shankh', value: 'Shankh' },
                { label: 'Sring', value: 'Sring' },
                { label: `Disclaimer: Ghosh Registeration Is One Time Registeration You Cannot Change Your Ghosh Item Future Without Permission`, disabled: true }
              ]}
              setOpen={setDropOpen}
              setValue={setGhosh}
            />
          </View>

          <TouchableOpacity onPress={setGhoshItem} style={styles.button}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>Next</Text></TouchableOpacity>


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
    height: '50%'
  },
  text: {
    color: 'orange',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  subtext: {
    color: 'white',
    fontSize: 13,
    fontWeight: '400',
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
    margin: 10,
    borderRadius: 8,
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
})