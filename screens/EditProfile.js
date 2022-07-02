import { ActivityIndicator, Alert, Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import Octicons from 'react-native-vector-icons/Octicons';
import { updateProfile } from 'firebase/auth';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import IoniIcon from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker';



const EditProfile = () => {

  const [Name, setName] = useState('Loading..');
  const [UpName, setUpName] = useState(auth.currentUser.displayName);
  const [Phone, setPhone] = useState('Loading..');
  const [UpPhone, setUpPhone] = useState(auth.currentUser.phoneNumber.slice(3));
  const [Place, setPlace] = useState('Loading..');
  const [UpPlace, setUpPlace] = useState('');
  const [Blood, setBlood] = useState('Loading..');
  const [Status, setStatus] = useState('Loading..');
  const [UpStatus, setUpStatus] = useState('');
  const [updatePage, setUpdatePage] = useState(false);
  const [UpBlood, setUpBlood] = useState('');
  const [loading, setLoading] = useState(false);
  const [DropDownOpen, setDropOpen] = useState(false);
  const [DropDown1Open, setDrop1Open] = useState(false);



  useEffect(() => {
    async function getSnap() {
      const docSnap = await getDoc(doc(db, "Users", auth.currentUser.uid))
      if (docSnap.exists()) {
        setName(docSnap.data().name)
        setPhone(docSnap.data().phone)
        setPlace(docSnap.data().place)
        setBlood(docSnap.data().blood)
        setStatus(docSnap.data().status)

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

      setLoading(false)
      setUpdatePage(false)

    } catch {
      setLoading(false)
      Alert.alert("ERRROR OCCURED")
    }
  }



  return (

    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size={80} style={styles.loader} color="orange" />}


      {updatePage ?
        <View style={{ height: '95%' }} >
          <ScrollView style={{ height: '99%', padding: 10 }}>
            <View style={{ width: '98%', justifyContent: 'center', }}>
              <Text style={{ fontWeight: '700', fontSize: 15, color: 'orange', margin: 5, marginBottom: 2, textAlign: 'center' }}>Edit Your Personal Informations</Text>
              <Text style={{ fontWeight: '400', fontSize: 12, color: 'white', margin: 5, marginBottom: 20, textAlign: 'center' }}>Select Your Blood Group And Current Status To Update Your Personal Information</Text>


              <Text style={{ fontWeight: '300', fontSize: 16, margin: 5, marginBottom: 5 }}>Enter Updating Name:</Text>
              <TextInput
                style={styles.input1}
                placeholder="Full Name"
                keyboardType="name-phone-pad"
                value={UpName}
                onChangeText={name => setUpName(name)}
              />

              <Text style={{ fontWeight: '300', fontSize: 16, margin: 5, marginBottom: 5 }}>Enter Your Updating Phone Number:</Text>
              <TextInput
                style={styles.input1}
                placeholder="7306899XXX"
                keyboardType="phone-pad"
                value={`${UpPhone} (Not Editable)`}
                editable={false}
                onChangeText={phone => setUpPhone(phone)}
              />


              <Text style={{ fontWeight: '300', fontSize: 16, margin: 5, marginBottom: 5 }}>Enter Your Place:</Text>
              <TextInput
                style={styles.input1}
                value={UpPlace}
                placeholder="Eg: Thiruvanvandoor"
                keyboardType="name-phone-pad"
                onChangeText={place => setUpPlace(place)}
              />


              <View style={{ backgroundColor: '#585959', padding: 10, borderRadius: 10, marginBottom: 20 }} >

                <Text style={styles.text3}>Current Status And Blood Group</Text>
                <View style={{ width: 'auto', marginTop: 8 }}>
                  <DropDownPicker
                    containerStyle={{ marginBottom: 15, backgroundColor: 'grey' }}
                    placeholder="Choose Your Current Status"
                    theme='LIGHT'
                    placeholderStyle={{
                      fontWeight: "400"
                    }}
                    dropDownContainerStyle={{ height: 500, width: 100 }}
                    open={DropDownOpen}
                    value={UpStatus}
                    listMode="MODAL"
                    modalProps={{
                      animationType: "slide",
                      presentationStyle: 'overFullScreen'
                    }}
                    modalContentContainerStyle={{
                      backgroundColor: "#fff",
                    }}
                    modalTitleStyle={{
                      fontWeight: "bold"
                    }}
                    listParentContainerStyle={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: 'auto'
                    }}
                    listParentLabelStyle={{
                      fontWeight: "400",
                      borderRadius: 10,
                      padding: 10,
                      margin: 5,
                      fontSize: 16

                    }}
                    itemSeparatorStyle={{
                      margin: 2
                    }}
                    tickIconContainerStyle={{
                      backgroundColor: 'grey',
                      padding: 10,
                      borderRadius: 5
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
                    modalTitle="Select Your Current Status"
                    closeOnBackPressed={true}
                    items={[
                      { label: `Active Status (Click Here)`, value: 'Active' },
                      { label: `InActive Status (Click Here)`, value: 'Busy' },
                      { label: `About: InActive Status \nIf You Select InActive Status You States That You Are Not Willing To Donate Your Blood To Others\n\nAbout: Active Status \nIf You Select Active Status You Are Willing To Donate Your Blood To Others Who Want Blood For Medical Conditions \n\n\n\n\n CopyRight 2022 Sankh Mandir App Terms And Conditions \n\n  Disclaimer: If Any Mistakes Happen Sankh Mandir App May Disable Your Account`, disabled: true }
                    ]}
                    setOpen={setDropOpen}
                    setValue={setUpStatus}
                  />
                </View>

                <View style={{ width: 'auto' }}>
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
              </View>

              <Button
                disabled={!UpBlood || !UpStatus || !UpName || !UpPhone}
                title="Update Account"
                color="orange"
                onPress={UpdateUser}
              />


            </View>
          </ScrollView>
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
                <Text style={styles.text}>Blood Donated: 1</Text>
                <Text style={styles.text}>Status: {Status == "Active" ? <Text style={{ color: '#61ff7b' }}>Active</Text> : <Text style={{ color: 'red' }}>Busy</Text>}</Text>
              </View>
              <View style={{ marginTop: 8, marginBottom: 15, margin: 5, backgroundColor: 'white', borderRadius: 10, padding: 8 }}>
                <Text style={{ margin: 2, fontSize: 15, fontWeight: 'bold', color: '#fa6b6b' }}>Blood Donation Informations</Text>
                <Text style={styles.text}>Blood Donated: 2</Text>
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
    marginBottom: 15,
    marginTop: 10
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
    color: 'black',
    margin: 5,
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