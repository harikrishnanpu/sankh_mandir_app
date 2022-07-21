import { ActivityIndicator, Alert, Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Octicons from 'react-native-vector-icons/Octicons';
import { signOut, updateProfile } from 'firebase/auth';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniIcon from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialsIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Actions } from 'react-native-router-flux'



const EditProfile = () => {

  const [Name, setName] = useState('Loading..');
  const [UpName, setUpName] = useState(auth.currentUser.displayName);
  const [Phone, setPhone] = useState('Loading..');
  const [UpPhone, setUpPhone] = useState(auth.currentUser.phoneNumber.slice(3));
  const [Place, setPlace] = useState('');
  const [BloodDonated, setBloodDonated] = useState(0);
  const [UpPlace, setUpPlace] = useState('');
  const [Blood, setBlood] = useState('Loading..');
  const [Status, setStatus] = useState('Loading..');
  const [UpStatus, setUpStatus] = useState('');
  const [updatePage, setUpdatePage] = useState(false);
  const [UpBlood, setUpBlood] = useState('');
  const [loading, setLoading] = useState(false);
  const [DropDownOpen, setDropOpen] = useState(false);
  const [DropDown1Open, setDrop1Open] = useState(false);
  const [Section1, setSection1] = useState(true);
  const [Section2, setSection2] = useState(false);
  const [Section3, setSection3] = useState(false);




  useEffect(() => {
    async function getSnap() {
      const docSnap = await getDoc(doc(db, "Users", auth.currentUser.uid))
      if (docSnap.exists()) {
        setName(docSnap.data().name)
        setPhone(docSnap.data().phone)
        setUpPlace(docSnap.data().place)
        setPlace(docSnap.data().place)
        setUpBlood(docSnap.data().blood)
        setBlood(docSnap.data().blood)
        setStatus(docSnap.data().status)
        setBloodDonated(docSnap.data().bloodDonated)
      }
    }
    getSnap()
  }, [updatePage])


  const UpdateUser = async () => {
    setLoading(true)
    try {
      await updateProfile(auth.currentUser, {
        displayName: UpName
      })

      await updateDoc(doc(db, "Users", auth.currentUser.uid), {
        name: UpName,
        phone: "+91" + UpPhone,
        blood: UpBlood,
        status: UpStatus,
        place: UpPlace
      })

      setLoading(false);
      setUpdatePage(false);
      setSection3(false);
      setSection1(true);

    } catch {
      setLoading(false)
      Alert.alert("ERRROR OCCURED")
    }
  }

  const updateStatus = (status) => {
    if (status == "Active") {
      setUpStatus("Active")
    } else {
      setUpStatus("Busy")
    }

  }



  return (

    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size={80} style={styles.loader} color="orange" />}


      {updatePage ?
        <View style={{ height: '95%' }} >
          <View style={{ height: '99%', padding: 10 }}>
            <View style={{ width: '98%', justifyContent: 'center', }}>
              <Text style={{ fontWeight: '700', fontSize: 15, color: 'orange', margin: 5, marginBottom: 2, textAlign: 'center' }}>Edit Your Personal Informations</Text>
              {Section1 && <Text style={{ fontWeight: '600', fontSize: 12, color: 'white', margin: 5, marginBottom: 20, textAlign: 'center' }}>Enter Your Full Name If You Want To Update</Text>}
              {Section2 && <Text style={{ fontWeight: '600', fontSize: 12, color: 'white', margin: 5, marginBottom: 20, textAlign: 'center' }}>Enter Your Place Name If Changed Or Want To Update</Text>}
              {Section3 && <Text style={{ fontWeight: '600', fontSize: 12, color: 'white', margin: 5, marginBottom: 20, textAlign: 'center' }}>Select Your Blood Group And Current Status To Update Your Personal Information</Text>}

              {Section1 && <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.411)', padding: 10, borderRadius: 10, margin: 2, marginBottom: 12 }}>
                {Section1 && <Text style={{ fontWeight: '500', fontSize: 14, margin: 8, marginBottom: 5, color: 'white' }}>Enter Updating Name:</Text>}
                {Section1 && <TextInput
                  style={styles.input1}
                  placeholder="Full Name"
                  keyboardType="name-phone-pad"
                  autoFocus
                  value={UpName}
                  onChangeText={name => setUpName(name)}
                />}

                {Section1 && <Text style={{ fontWeight: '500', fontSize: 14, margin: 8, marginBottom: 5, color: 'white' }}>Your Phone Number:</Text>}
                {Section1 && <TextInput
                  style={styles.input1}
                  placeholder="7306899XXX"
                  keyboardType="phone-pad"
                  value={`${UpPhone} (Not Editable)`}
                  editable={false}
                  onChangeText={phone => setUpPhone(phone)}
                />}
              </View>}


              {Section2 && <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.411)', padding: 10, borderRadius: 10, margin: 2, marginBottom: 12 }}>
                {Section2 && <Text style={{ fontWeight: '500', fontSize: 14, margin: 8, marginBottom: 5, color: 'white' }}>Update Your Place Name:</Text>}
                {Section2 && <TextInput
                  style={styles.input1}
                  value={UpPlace}
                  autoFocus
                  placeholder="Eg: Thiruvanvandoor"
                  keyboardType="name-phone-pad"
                  onChangeText={place => setUpPlace(place)}
                />}
              </View>}


              {Section3 && <View>

                <Text style={{ fontWeight: '500', fontSize: 11, margin: 6, marginBottom: 5, color: 'white', textAlign: 'center' }}>Update Your Current Status By Clicking The Below Status Buttons</Text>
                <View style={{ width: 'auto', marginTop: 8, marginBottom: 25, flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => updateStatus("Active")} style={{
                    backgroundColor: UpStatus == "Active" ? '#474e5d' : 'white',
                    borderRadius: 15, padding: 10, paddingHorizontal: 50, margin: 5
                  }} ><Text style={{ fontWeight: 'bold', color: '#5aed61', }}>Active <MaterialsIcon name="heart-plus" size={20} /></Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => updateStatus("Busy")} style={{ backgroundColor: UpStatus == "Busy" ? '#474e5d' : 'white', borderRadius: 15, padding: 10, paddingHorizontal: 50, margin: 5 }} ><Text style={{ fontWeight: 'bold', color: '#fa3939', }}>Busy <MaterialsIcon name="heart-off" size={20} /></Text></TouchableOpacity>
                </View>
                <Text style={{ fontWeight: '500', fontSize: 11, margin: 4, marginBottom: 5, color: 'white', textAlign: 'center' }}>Update Your Blood Group By Clicking The Below Button</Text>
                <View style={{ width: 'auto', marginTop: 8 }}>
                  <DropDownPicker
                    theme="LIGHT"
                    containerStyle={{ marginBottom: 25, zIndex: 10 }}
                    placeholder="Choose Your Blood Group"
                    placeholderStyle={{
                      fontWeight: "400"
                    }}
                    dropDownContainerStyle={{ height: 500, width: 100 }}
                    open={DropDown1Open}
                    value={UpBlood}
                    listMode="MODAL"
                    modalProps={{
                      animationType: "slide",
                      presentationStyle: 'overFullScreen',

                    }}
                    modalContentContainerStyle={{
                      backgroundColor: "#fff",
                    }}
                    modalTitleStyle={{
                      fontWeight: "bold",
                      color: 'red'
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
                      color: 'black'

                    }}
                    itemSeparatorStyle={{
                      margin: 2
                    }}
                    tickIconContainerStyle={{
                      backgroundColor: 'red',
                      padding: 10,
                      borderRadius: 5
                    }}
                    disabledItemLabelStyle={{
                      color: 'grey',
                      fontWeight: '400',
                      fontSize: 10,
                      textAlign: 'center'
                    }}
                    disabledItemContainerStyle={{
                      height: 'auto'
                    }}
                    itemSeparator={true}
                    modalTitle="Select Your Blood Group"
                    closeOnBackPressed={true}
                    items={[
                      { label: 'A+ve', value: 'A+ve' },
                      { label: 'A-ve', value: 'A-ve' },
                      { label: 'B+ve', value: 'B+ve' },
                      { label: 'B-ve', value: 'B-ve' },
                      { label: 'O+ve', value: 'O+ve' },
                      { label: 'O-ve', value: 'O-ve' },
                      { label: 'AB+ve', value: 'AB+ve' },
                      { label: 'AB-ve', value: 'AB-ve' },
                      { label: `Disclaimer: Verify Your Blood Group Correctly. If Any Mistakes Happen Your Account Will Be Banned From Sankh Mandir App`, disabled: true }
                    ]}
                    setOpen={setDrop1Open}
                    setValue={setUpBlood}
                  />
                </View>
              </View>}

              {Section1 && <Button
                disabled={!UpName}
                title="Next"
                color="orange"
                onPress={() => { setSection1(false); setSection2(true) }}
              />}

              {Section2 && <Button
                disabled={!UpPlace}
                title="Next"
                color="orange"
                onPress={() => { setSection2(false); setSection3(true) }}
              />}

              {Section3 && <Button
                disabled={!UpBlood || !UpStatus}
                title="Update Account"
                color="orange"
                onPress={UpdateUser}
              />}


            </View>
          </View>
        </View>
        :

        <View style={{ height: '95%' }} >
          <ScrollView>
            <View style={{ margin: 10 }}>
              <Image style={styles.image} source={require('../assets/logo1`.png')} />
              <Text style={styles.title}>Your Personal Informations: </Text>

              <View style={{ margin: 5, backgroundColor: 'white', borderRadius: 10, padding: 8 }}>
                <Text style={styles.text}>Full Name: {Name}</Text>
                <Text style={styles.text}>Phone Number: {Phone.slice(3, -5)}XXXXX</Text>
                <Text style={styles.text}>Blood: {Blood}</Text>
                <Text style={styles.text}>Place: {Place}</Text>
                <Text style={styles.text}>Points: 10</Text>
                <Text style={styles.text}>Blood Donated: {BloodDonated}</Text>
                <Text style={styles.text}>Status: {Status == "Active" ? <Text style={{ color: '#61ff7b' }}>Active</Text> : <Text style={{ color: 'red' }}>Busy</Text>}</Text>
                <TouchableOpacity onPress={() => Alert.alert(
                  "Want To Logout",
                  "Are You Sure Want To Logout Your Current Account",
                  [
                    {
                      text: "Logout",
                      onPress: () => { setLoading(true); signOut(auth).then(() => { Actions.login(); setLoading(false) }).catch((e) => { setLoading(false); Alert.alert("Error Ocuured", e.message) }) },
                    },
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel Pressed"),
                    },
                  ]
                )} style={{ backgroundColor: '#8f8f8f', padding: 8, borderRadius: 10, alignItems: 'center', margin: 5 }}><Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text></TouchableOpacity>
              </View>
              <View style={{ marginTop: 8, marginBottom: 15, margin: 5, backgroundColor: 'white', borderRadius: 10, padding: 8 }}>
                <Text style={{ margin: 2, fontSize: 15, fontWeight: 'bold', color: '#fa6b6b' }}>Blood Donation Informations</Text>
                <Text style={styles.text}>Blood Donated: {BloodDonated}</Text>
                <Text style={styles.text}>Sankh Mandir Certificates: 2</Text>
                <TouchableOpacity style={{ backgroundColor: '#8f8f8f', borderRadius: 10, padding: 8, alignItems: 'center', margin: 5 }} onPress={() => Alert.alert("Certificate Not Updated", "You Will Get A Notification When Available")} ><Text style={{ color: 'white', fontWeight: 'bold' }}>Download Certificate <FontAwesome5Icon name="heart" color="red" /></Text></TouchableOpacity>
              </View>
              <TouchableOpacity style={{ backgroundColor: 'orange', borderRadius: 10, padding: 12, alignItems: 'center', margin: 5, marginTop: 8 }} onPress={() => setUpdatePage(true)} ><Text style={{ color: 'white', fontWeight: 'bold' }}>EDIT INFORMATION <FontAwesome5Icon name="user-edit" /></Text></TouchableOpacity>


              <Text style={styles.text1}>Verified User  <Octicons name="verified" color="#61ff7b" size={22} /> of Sankh Mandir App <Text style={{ color: 'orange' }}>{"\n"} Terms And Conditions</Text> of &copy;2022</Text>
            </View>
          </ScrollView>
        </View>
      }

      <View style={{ alignItems: 'center' }}>

        <View>
          <Text style={{ bottom: 0, fontWeight: '400', color: 'white', fontSize: 10, alignItems: 'center', justifyContent: 'center', margin: 2, textAlign: 'center' }}>&copy; 2022 Sankh Mandir App<Text style={{ color: 'orange' }}> Terms And Conditions Applied</Text> {'\n'} Disclaimer: Verified Users Are Only Acceptable</Text>
        </View>


      </View>

    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    height: 'auto',
    width: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 10,
    padding: 6
  },
  image: {
    width: 200,
    height: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    marginTop: 2
  },
  title: {
    color: 'orange',
    fontSize: 15,
    fontWeight: 'bold',
    margin: 8,

  },
  text: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '600',
    margin: 6,
  },
  text3: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    margin: 6,
  },
  text1: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 8,
    margin: 8,
    textAlign: 'center'
  },
  text2: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    margin: 5,
    left: 0,
    marginBottom: 20
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
    margin: 5

  },
  input1: {
    marginBottom: 15,
    borderWidth: 2,
    padding: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: 'white',
    margin: 5,
    fontWeight: 'bold'
  },
  loader: {
    zIndex: 10000,
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '42%',
    height: 90,
    marginBottom: 'auto',
    marginTop: 'auto'
  },
})