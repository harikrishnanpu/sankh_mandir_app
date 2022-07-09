import { ActivityIndicator, Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import DropDownPicker from 'react-native-dropdown-picker'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import MaterialsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'


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
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView style={{ height: '100%', width: '99%' }}>
        {loading && <View style={{ backgroundColor: 'white', height: '100%', width: '100%', position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <Image style={[styles.image1]} source={require('../assets/ghosh.png')} />
          <ActivityIndicator size={60} style={styles.loader} color="orange" />
        </View>}

        {ghoshPage ?
          <View>
            <View style={styles.card}>
              <Image style={styles.cardImage} source={require('../assets/ghosh.png')} />
              <Text style={styles.cardTitle}>Gosh Team Thiruvanvandoor <FontAwesome5Icon name="drum" size={25} /></Text>
              <Text style={styles.cardText}>Namaste,{auth.currentUser?.displayName}You Selected As {ghoshItem} Vatak In Rss Tvndr Gosh Team. Further Updates Available Soon..</Text>
              <Text style={styles.cardSubTitle}>Gosh Classes, Gosh Updates and Gosh Baitaks</Text>
              {ghoshItem == "Anak" ? <TouchableOpacity onPress={() => Alert.alert("Sorry, Under Review", "Please Try Again Later")} style={styles.cardButton}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>{ghoshItem} <FontAwesome5 name="drum" size={25} /></Text></TouchableOpacity> : <TouchableOpacity onPress={() => Alert.alert("Sorry, Under Review", "Please Try Again Later")} style={styles.cardButton}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 15 }}>{ghoshItem} <MaterialsIcon name="trumpet" size={25} /></Text></TouchableOpacity>}
            </View>

            <View style={styles.card1}>
              <Text style={styles.cardTitle}>Sankh Mandir Gosh Online Store <FontAwesome5Icon name="drum" size={25} /></Text>
              <Text style={styles.cardText}>Buy Your Gosh Items Online: Anak, Vamsi, Sankh, Sring</Text>
              <Text style={styles.cardSubTitle}>Click Below Button To See Store</Text>
              <TouchableOpacity style={styles.cardButton} onPress={() => Alert.alert("Not Available", "Page Is Under Update You Will Get A Notification If Completed")}><Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Buy {ghoshItem}</Text></TouchableOpacity>
            </View>
          </View>

          : <View style={styles.card1}>
            <Image style={styles.cardImage} source={require('../assets/ghosh.png')} />
            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.411)', margin: 10, padding: 10, borderRadius: 10 }}>
              <Text style={styles.cardTitle}>Gosh Team Tvndr Registeration <FontAwesome5 name="drum" size={20} /></Text>
              <Text style={[styles.cardText, { fontSize: 15, color: 'grey' }]}>Registeration Informations</Text>
              <Text style={styles.cardText}>Name: {auth.currentUser.displayName}</Text>
              <Text style={styles.cardSubTitle}>Click The Below Button To Select The Gosh Item</Text>
              <View style={{ width: '90%', margin: 10 }}>
                <DropDownPicker
                  containerStyle={{ marginBottom: 8, zIndex: 10 }}
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
            </View>

            <TouchableOpacity disabled={!ghosh} onPress={setGhoshItem} style={styles.cardButton}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 15, margin: 5 }}>Register</Text></TouchableOpacity>



            <Text style={{ bottom: 9, fontWeight: '400', color: 'white', fontSize: 10, alignItems: 'center', justifyContent: 'center', margin: 10, textAlign: 'center' }}>&copy; 2022 Sankh Mandir App<Text style={{ color: 'orange' }}> Terms And Conditions Applied</Text> {'\n'} Disclaimer: Verified Users Are Only Acceptable</Text>

          </View>}
      </SafeAreaView>
    </View>
  )
}

export default GhoshScreen

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    fontFamily: 'sans-serif',
    margin: 2
  },
  subtext: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    margin: 1,
    textAlign: 'center'
  },
  subtext1: {
    fontSize: 12,
    color: 'white',
    fontWeight: '700',
    margin: 1,
    textAlign: 'center',
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
    marginBottom: 0,
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
  card: {
    height: 'auto',
    width: '98%',
    backgroundColor: '#fa8107',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
    marginBottom: 4,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: 'white'
  },
  card1: {
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
    fontSize: 16,
    color: '#fff',
    fontFamily: 'sans-serif',
    margin: 2,
    textAlign: 'center'
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
    padding: 5,
    marginBottom: 15,
    textAlign: 'center'
  },
  cardSubTitle: {
    fontSize: 10,
    color: 'white',
    fontWeight: '300',
    margin: 1,
    textAlign: 'center'
  },
  cardImage: {
    height: 100,
    width: 120,
    margin: 2,
    padding: 5,
    borderRadius: 5
  },
})