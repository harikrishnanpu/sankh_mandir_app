import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TextInput, Button, ActivityIndicator, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Actions } from 'react-native-router-flux'
import { getApp, initializeApp } from 'firebase/app';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getAuth, onAuthStateChanged, PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, getDocs, getDoc } from "firebase/firestore";
import DropDownPicker from 'react-native-dropdown-picker';


const firebaseConfig = {
  apiKey: "AIzaSyCAWxpWL9iTD5QVwIaY-4V3vo7AUhreueo",
  authDomain: "otp-generator-and-users-db.firebaseapp.com",
  projectId: "otp-generator-and-users-db",
  storageBucket: "otp-generator-and-users-db.appspot.com",
  messagingSenderId: "76579294228",
  appId: "1:76579294228:web:f32246444640487e756b01",
  measurementId: "G-27YFRDLRC5"
};

try {
  initializeApp(firebaseConfig)
} catch {
  alert("Error Ocuured")
}


const changeLang = () => {
  Alert.alert("Changing Language", "Something Went Wrong!....")
}

const app = getApp();
const auth = getAuth();
const db = getFirestore(app);


if (auth.currentUser) {
  Actions.home()
} else {
  console.log("User not found")
}




const LoginScreen = () => {

  const recaptchaVerifier = useRef(null);
  const [OtpScreen, setOtpScreen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Username, setName] = useState('');
  const [message, showMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [blood, setBlood] = useState(null);
  const [place, setPlace] = useState('');
  const [status, setStatus] = useState('Active')
  const [verificationId, setVerificationId] = useState('');
  const attemptInvisibleVerification = true;
  const [Otp1, setOtp1] = useState('');
  const [Otp2, setOtp2] = useState('');
  const [Otp3, setOtp3] = useState('');
  const [Otp4, setOtp4] = useState('');
  const [Otp5, setOtp5] = useState('');
  const [Otp6, setOtp6] = useState('');
  const OtpRef1 = useRef();
  const OtpRef2 = useRef();
  const OtpRef3 = useRef();
  const OtpRef4 = useRef();
  const OtpRef5 = useRef();
  const OtpRef6 = useRef();
  const verificationCode = Otp1 + Otp2 + Otp3 + Otp4 + Otp5 + Otp6;
  const [ConfirmIdentity, setConfirmIdentity] = useState(false);
  const [DropDownOpen, setDropOpen] = useState(false)




  const verifyPhoneNumber = async () => {
    const phoneAuthNumber = '+91' + phoneNumber
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneAuthNumber,
        recaptchaVerifier.current
      )
      setVerificationId(verificationId);
      setOtpScreen(true)
    } catch (err) {
      alert("ERROR OCUURED", err.message)
    }
  }


  const verifyConfirmation = async () => {
    setLoading(true)
    try {
      const credential = PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await signInWithCredential(auth, credential).then(() => {
        updateProfile(auth.currentUser, {
          displayName: Username
        })
      })
      showMessage({ text: 'Phone authentication successful 👍', color: 'green' });
      const DocSnap = await getDoc(doc(db, "Users", auth.currentUser.uid));
      if (DocSnap.exists()) {
        Actions.home()
        setLoading(false)
      } else {
        setConfirmIdentity(true)
        setLoading(false)
      }
      showMessage(null)
    } catch (err) {
      setLoading(false)
      showMessage({ text: `Error: ${err.message}`, color: 'red' });
    }
  }

  const verifyBloodGroup = async () => {
    setLoading(true);
    try {
      const DocSnap = await getDoc(doc(db, "Users", auth.currentUser.uid));
      if (DocSnap.exists()) {
        await updateDoc(doc(db, "Users", auth.currentUser.uid), {
          name: auth.currentUser.displayName,
          phone: auth.currentUser.phoneNumber,
          blood: blood,
          place: place,
          status: status
        });
      } else {
        await setDoc(doc(db, "Users", auth.currentUser.uid), {
          name: auth.currentUser.displayName,
          phone: auth.currentUser.phoneNumber,
          blood: blood,
          place: place,
          status: status
        });
      }
      Actions.home()
      setLoading(false)
    } catch (e) {
      Alert.alert("ERROR OCUURED", e.messsage)
      setLoading(false)
    }
  }




  return (


    <View>



      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />

      {loading && <ActivityIndicator size={80} style={styles.loader} color="orange" />}



      <View style={styles.mainContainer}>


        <Text style={styles.title}>SANKHA MANDIR</Text>
        {ConfirmIdentity ? undefined : <Text style={styles.label}>Thiruvanvandoor</Text>}

        {ConfirmIdentity && <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 5, marginBottom: 5, textAlign: 'center' }}>Your Personal Details Informations</Text>

          <Text style={styles.label}>Name: {auth.currentUser?.displayName ? auth.currentUser.displayName : undefined}</Text>
          <Text style={styles.label}>Phone Number: {auth.currentUser?.phoneNumber ? auth.currentUser.phoneNumber : undefined}</Text>
        </View>}



        <KeyboardAvoidingView style={styles.container}>
          {ConfirmIdentity && <Text style={{ margin: 2, color: 'white', textAlign: 'center' }}>We Need More Information To Activate Your Sankha Mandir Account</Text>}
          {OtpScreen && ConfirmIdentity ? undefined : <Image style={styles.image} source={require('../assets/logo1`.png')} />}


          {message ? (
            <TouchableOpacity
              style={styles.message}
              onPress={() => showMessage(undefined)}>
              <Text
                style={{
                  margin: 2,
                  fontSize: 16,
                  color: message.color ? message.color : "grey"
                }}>
                {message.text}
              </Text>
            </TouchableOpacity>) : (undefined)}


          <View>
            {OtpScreen ? (undefined) : <Text style={{
              margin: 5,
              fontSize: 16,
              marginRight: '40%'
            }}>Enter Your Full Name</Text>}


            {OtpScreen ? (undefined) : <TextInput
              style={styles.input}
              placeholder="Full Name"
              autoFocus
              value={Username}
              onChangeText={name => setName(name)}
            />}

            {OtpScreen ? (undefined) : <Text style={{
              margin: 5,
              fontSize: 16,
              marginRight: '40%'
            }}>Enter Your phone number</Text>}


            {OtpScreen ? (undefined) : <TextInput
              style={styles.input}
              placeholder="Enter Your Number"
              maxLength={10}
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />}

            {OtpScreen ? (undefined) : <Button
              title="Send Verification Code"
              disabled={!phoneNumber || phoneNumber.length !== 10 || !Username}
              color="orange"
              onPress={verifyPhoneNumber}
            />}
            <Text style={{ marginBottom: 8 }}></Text>
          </View>


          {OtpScreen && !ConfirmIdentity ? <View>
            <Text style={styles.label}>Enter Verification Code </Text>

            <View style={{
              alignSelf: "flex-start", flexDirection: "row",
              flexWrap: "wrap",
            }}>

              <TextInput
                style={styles.Otpinput}
                editable={!!verificationId}
                onChangeText={(text) => {
                  setOtp1(text)
                  text && OtpRef2.current.focus()
                }}
                keyboardType="number-pad"
                maxLength={1}
                ref={OtpRef1}
                autoFocus
              />

              <TextInput
                style={styles.Otpinput}
                editable={!!verificationId}
                onChangeText={(text) => {
                  setOtp2(text)
                  text ? OtpRef3.current.focus() : OtpRef1.current.focus()
                }}
                maxLength={1}
                keyboardType="number-pad"
                ref={OtpRef2}
              />

              <TextInput
                style={styles.Otpinput}
                editable={!!verificationId}
                onChangeText={(text) => {
                  setOtp3(text)
                  text ? OtpRef4.current.focus() : OtpRef2.current.focus()
                }}
                maxLength={1}
                keyboardType="number-pad"
                ref={OtpRef3}
              />

              <TextInput
                style={styles.Otpinput}
                editable={!!verificationId}
                onChangeText={(text) => {
                  setOtp4(text)
                  text ? OtpRef5.current.focus() : OtpRef3.current.focus()
                }}
                maxLength={1}
                keyboardType="number-pad"
                ref={OtpRef4}
              />

              <TextInput
                style={styles.Otpinput}
                editable={!!verificationId}
                onChangeText={(text) => {
                  setOtp5(text)
                  text ? OtpRef6.current.focus() : OtpRef4.current.focus()
                }}
                maxLength={1}
                keyboardType="number-pad"
                ref={OtpRef5}
              />

              <TextInput
                style={styles.Otpinput}
                editable={!!verificationId}
                onChangeText={(text) => {
                  setOtp6(text)
                  !text && OtpRef5.current.focus()
                }}
                maxLength={1}
                keyboardType="number-pad"
                ref={OtpRef6}
              />




            </View>

            <Button
              title="Confirm Verification Code"
              color="orange"
              disabled={!verificationId}
              onPress={verifyConfirmation}
            />

          </View> : undefined}

          <View>

            {OtpScreen && ConfirmIdentity ?
              <KeyboardAvoidingView style={{ width: '98%', justifyContent: 'center' }}>
                <Text style={{ fontWeight: '600', fontSize: 16, margin: 5, marginBottom: 5, textAlign: 'center' }}>Enter Your Blood Group For Rss Tvndr Blood Donation Prg <Fontisto size={20} style={{ color: 'red' }} name="blood-drop" /> </Text>
                <View style={{ width: '90%', margin: 5 }}>
                  <DropDownPicker
                    containerStyle={{ marginBottom: 15, zIndex: 10 }}
                    placeholder="Choose Your Blood Group"
                    placeholderStyle={{
                      fontWeight: "400"
                    }}
                    dropDownContainerStyle={{ height: 500, width: 100 }}
                    open={DropDownOpen}
                    value={blood}
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
                    tickIconStyle={{
                      borderColor: 'black'
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
                      { label: `Disclaimer: Verify Your Blood Group Correctly`, disabled: true }
                    ]}
                    setOpen={setDropOpen}
                    setValue={setBlood}
                  />
                </View>

                <Text style={{ fontWeight: '600', fontSize: 16, margin: 5, marginBottom: 5 }}>Enter Your Place:</Text>
                <TextInput
                  style={styles.input1}
                  placeholder="Eg: Thiruvanvandoor"
                  keyboardType="name-phone-pad"
                  onChangeText={place => setPlace(place)}
                />

                <Button
                  disabled={!blood || !place}
                  title="Activate Account"
                  color="orange"
                  onPress={verifyBloodGroup}
                />


              </KeyboardAvoidingView> : undefined
            }

          </View>



        </KeyboardAvoidingView>

        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Text onPress={changeLang} style={styles.footer}>Change Language ( Malayalam )</Text>
          <Text style={styles.footer}>©2022 SANKHA MANDIR - THIRUVANVANDOOR </Text>
          <Text style={styles.footer1}> ( All Rights Reserved ) </Text>
          {attemptInvisibleVerification && <FirebaseRecaptchaBanner style={styles.recaptcha} textStyle={{ textAlign: 'center', color: 'grey' }} />}
        </View>
      </View>






    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5e5b58',
    borderRadius: 10,
    margin: 15,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 29,
    color: 'orange',
    opacity: 1
  },
  label: {
    margin: 4,
    fontSize: 16,
    textAlign: 'center'
  },
  image: {
    width: 200,
    height: 100,
    margin: 10,
    borderRadius: 10,
    opacity: .8,
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
    marginBottom: 20,
    borderWidth: 2,
    padding: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: 'black',
    margin: 5,
  },
  Otpinput: {
    height: 40,
    marginBottom: 20,
    borderWidth: 2,
    padding: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: 'white',
    margin: 5,
    width: 40
  },
  button: {
    alignItems: "center",
    backgroundColor: "orange",
    marginTop: 30,
    padding: 10,
    width: '60%',
    borderRadius: 5,
    backgroundColor: 'orange'
  },
  footer: {
    fontSize: 14,
    color: 'grey',
    margin: 1
  },
  footer1: {
    fontSize: 14,
    color: 'grey',
    margin: 1,
    marginBottom: 10
  },
  message: {
    position: 'relative',
    zIndex: 1000,
    justifyContent: 'center',
    fontSize: 14,
    color: 'white',
    margin: 15,
    backgroundColor: 'grey',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    textAlign: 'center'
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
  recaptcha: {
    textAlign: 'center',
    justifyContent: 'center',
    margin: 5,
    position: 'absolute',
    top: '100%',

  }
})