import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TextInput, Button, ActivityIndicator, Alert, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Actions } from 'react-native-router-flux'
import { getApp, initializeApp } from 'firebase/app';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { getAuth, onAuthStateChanged, PhoneAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import Fontisto from 'react-native-vector-icons/Fontisto'
import { getFirestore, collection, addDoc, doc, setDoc, updateDoc, getDocs, getDoc } from "firebase/firestore";
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'


const firebaseConfig = {
  apiKey: "AIzaSyDz86Mb6rn8JSesxNaJolGU_el67enmUSE",
  authDomain: "sankh-mandir-app.firebaseapp.com",
  projectId: "sankh-mandir-app",
  storageBucket: "sankh-mandir-app.appspot.com",
  messagingSenderId: "976054396303",
  appId: "1:976054396303:web:806fe9250827743bab97fa",
  measurementId: "G-XWPWXQD0ZL"
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
  const [status, setStatus] = useState('Active');
  const [verificationId, setVerificationId] = useState('');
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
  const [ConfirmIdentity1, setConfirmIdentity1] = useState(false);
  const [DropDownOpen, setDropOpen] = useState(false)




  const verifyPhoneNumber = async () => {
    setLoading(true)
    showMessage('')
    const phoneAuthNumber = '+91' + phoneNumber
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneAuthNumber,
        recaptchaVerifier.current
      )
      setVerificationId(verificationId);
      setOtpScreen(true)
      setLoading(false)
    } catch (err) {
      showMessage({ text: err.message })
      setLoading(false)
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
      showMessage({ text: `Error: ${err.message}` });
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
          status: status,
          isFirst: true,
          uid: auth.currentUser.uid,
          bloodDonated: "0"
        });
      } else {
        await setDoc(doc(db, "Users", auth.currentUser.uid), {
          name: auth.currentUser.displayName,
          phone: auth.currentUser.phoneNumber,
          blood: blood,
          place: place,
          status: status,
          isFirst: true,
          uid: auth.currentUser.uid,
          bloodDonated: 0
        });
      }
      Actions.home()
      setLoading(false)
    } catch (e) {
      Alert.alert(e.messsage)
      setLoading(false)
    }
  }




  return (


    <ScrollView>



      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        title="Click The Below Tick Box"
        textZoom={110}
        cancelLabel="Close"
      />

      {loading && <ActivityIndicator size={80} style={styles.loader} color="#fc9003" />}



      <KeyboardAvoidingView style={styles.mainContainer}>


        <Text style={styles.title}>SANKHA MANDIR APP</Text>
        {ConfirmIdentity ? undefined : ConfirmIdentity1 ? undefined : <Text style={styles.label}>Thiruvanvandoor</Text>}

        {ConfirmIdentity ? <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Given Personal Details</Text>
          <Text style={styles.label}>Name: <Text style={{ color: 'orange' }}>{auth.currentUser?.displayName ? auth.currentUser.displayName : undefined}</Text> </Text>
          <Text style={styles.label}>Phone Number: <Text style={{ color: 'orange' }}>{auth.currentUser?.phoneNumber ? auth.currentUser.phoneNumber : undefined}</Text>  <Text onPress={() => { setOtpScreen(false); setConfirmIdentity(false); setConfirmIdentity1(false) }} style={{ color: 'grey', textDecorationLine: 'underline' }}>Change</Text></Text>
        </View> : undefined}

        {ConfirmIdentity1 ? <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Given Personal Details</Text>
          <Text style={styles.label}>Name: <Text style={{ color: 'orange' }}>{auth.currentUser?.displayName ? auth.currentUser.displayName : undefined}</Text> </Text>
          <Text style={styles.label}>Phone Number: <Text style={{ color: 'orange' }}>{auth.currentUser?.phoneNumber ? auth.currentUser.phoneNumber : undefined}</Text> {ConfirmIdentity1 ? undefined : <Text onPress={() => { setOtpScreen(false); setConfirmIdentity(false) }} style={{ color: 'grey', textDecorationLine: 'underline' }}>Change</Text>}</Text>
        </View> : undefined}



        <KeyboardAvoidingView style={styles.container}>
          {OtpScreen && ConfirmIdentity ? undefined : OtpScreen && ConfirmIdentity1 ? undefined : OtpScreen ? <View style={styles.backButton} onPress={() => setOtpScreen(false)} ><MaterialsIcon onPress={() => setOtpScreen(false)} style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white', alignItems: 'center', fontWeight: 'bold' }} name="arrow-back" size={22} /><Text onPress={() => setOtpScreen(false)} style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center', fontSize: 16 }}>Back</Text></View> : undefined}
          {ConfirmIdentity && <Text style={{ margin: 1, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Enter Your Blood Group For Registeration</Text>}
          {ConfirmIdentity1 && <Text style={{ margin: 1, color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Enter Your Current Place For Shaka Registeration</Text>}
          {OtpScreen && ConfirmIdentity ? undefined : OtpScreen && ConfirmIdentity1 ? undefined : <Image style={styles.image} source={require('../assets/logo1`.png')} />}

          {message ? (
            <TouchableOpacity
              style={styles.message}
              onPress={() => showMessage(undefined)}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: "white",
                  textAlign: 'center',
                  textAlignVertical: 'center'
                }}>
                {message.text} {message.color == "green" && <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}><MaterialsIcon color="#7cf79d" name="verified" /></Text>}
              </Text>
            </TouchableOpacity>) : (undefined)}


          <View style={{ width: '95%' }}>
            {OtpScreen ? (undefined) : <Text style={{
              margin: 5,
              fontSize: 14,
              fontWeight: 'bold'
            }}>Enter Your Full Name</Text>}


            {OtpScreen ? (undefined) : <TextInput
              style={styles.input}
              placeholder="Full Name"
              autoFocus
              autoComplete='name-given'
              value={Username}
              onChangeText={name => setName(name)}
            />}

            {OtpScreen ? (undefined) : <Text style={{
              margin: 5,
              fontSize: 14,
              fontWeight: 'bold'
            }}>Enter Your phone number</Text>}


            {OtpScreen ? (undefined) : <TextInput
              style={styles.input}
              placeholder="Enter Your Number"
              maxLength={10}
              autoComplete="tel"
              dataDetectorTypes="phoneNumber"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
            />}

            {OtpScreen ? (undefined) : <Button
              title="Send Verification Code"
              disabled={!phoneNumber || phoneNumber.length !== 10 || !Username}
              color="#fc9003"
              onPress={verifyPhoneNumber}
            />}
            <Text style={{ marginBottom: 8 }}></Text>
          </View>


          {OtpScreen && !ConfirmIdentity && !ConfirmIdentity1 ? <View>
            <Text style={{ margin: 6, textAlign: 'center', fontSize: 11, fontWeight: 'bold' }}>OTP Sent Successfully To Your Number: <Text style={{ color: 'orange' }}>{phoneNumber}</Text></Text>
            <Text style={{ margin: 5, textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Enter Verification Code ( OTP )</Text>

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
                autoComplete='sms-otp'
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
              color="#fc9003"
              disabled={!verificationId}
              onPress={verifyConfirmation}
            />

          </View> : undefined}

          <SafeAreaView>

            {OtpScreen && ConfirmIdentity ?
              <KeyboardAvoidingView style={{ width: '98%', justifyContent: 'center' }}>

                <View style={{ backgroundColor: '#a8a8a7', width: '100%', padding: 5, borderRadius: 10, marginBottom: 15, margin: 5 }}>
                  <View style={{ width: '99%', margin: 8 }}>
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
                        { label: `Disclaimer: Verify Your Blood Group Correctly. If Any Error Occured Sankh Mandir App is Not Responsible For The Error`, disabled: true }
                      ]}
                      setOpen={setDropOpen}
                      setValue={setBlood}
                    />
                  </View>
                </View>

                <Button
                  disabled={!blood}
                  title="Next"
                  color="#fc9003"
                  onPress={() => {
                    setConfirmIdentity(false);
                    setConfirmIdentity1(true);
                  }}
                />


              </KeyboardAvoidingView> : undefined
            }

          </SafeAreaView>

          <SafeAreaView>

            {OtpScreen && ConfirmIdentity1 ? (
              <KeyboardAvoidingView style={{ width: '50%', justifyContent: 'center' }}>

                <Text style={{ fontWeight: '600', fontSize: 14, margin: 8, marginBottom: 5 }}>Enter Your Place Name</Text>
                <TextInput
                  style={styles.input1}
                  placeholder="Eg: Thiruvanvandoor"
                  keyboardType="name-phone-pad"
                  onChangeText={place => setPlace(place)}
                  autoFocus
                />

                <Button
                  disabled={!place}
                  title="Activate Account"
                  color="#fc9003"
                  onPress={verifyBloodGroup}
                />


              </KeyboardAvoidingView>) : (undefined)
            }

          </SafeAreaView>



        </KeyboardAvoidingView>

        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Text onPress={changeLang} style={styles.footer}>Change Language ( Malayalam )</Text>
          <Text style={styles.footer}>©2022 SANKHA MANDIR - THIRUVANVANDOOR </Text>
          <Text style={styles.footer1}> ( All Rights Reserved ) </Text>
          <FirebaseRecaptchaBanner style={styles.recaptcha} textStyle={{ textAlign: 'center', color: 'black' }} />
        </View>
      </KeyboardAvoidingView>






    </ScrollView>
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
    fontSize: 22,
    marginTop: 29,
    color: '#fc9003',
    opacity: 1
  },
  label: {
    margin: 2,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500'
  },
  image: {
    width: 200,
    height: 100,
    margin: 12,
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
    color: 'white',
    margin: 8,
    minWidth: 280,
    maxWidth: 300
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
    backgroundColor: "#fc9003",
    marginTop: 30,
    padding: 10,
    width: '60%',
    borderRadius: 5
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
    backgroundColor: '#ff0033',
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
    marginTop: 10
  },
  backButton: {
    left: 6,
    top: 8,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    margin: 5
  }
})