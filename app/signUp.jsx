import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { hp, wp } from '../helpers/common'
import Input from '../components/Input'
import Icon from '../assets/icons'
import Button from '../components/Button'

const SignUp = () => {

  const router = useRouter();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const nameRef = useRef('')
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current || !nameRef.current) {
      Alert.alert('Sign Up', "Please fill all the fields!");
      return;
    }
    // good to go (API)
  }

  return (
    <ScreenWrapper bg='white'>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <BackButton router={router} />  

        {/* Welcome text */}
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        {/* Form Sign Up */}
        <View style={styles.form}>
          <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
            Please fill the details to create an account
          </Text>
          <Input 
            icon = {<Icon name='user' size={26} strokeWidth={1.6} />}
            placeholder = 'Enter your name'
            onChangeText = {value => nameRef.current = value}
          />
          <Input 
            icon = {<Icon name='mail' size={26} strokeWidth={1.6} />}
            placeholder = 'Enter your email'
            onChangeText = {value => emailRef.current = value}
          />
          <Input 
            icon = {<Icon name='lock' size={26} strokeWidth={1.6} />}
            placeholder = 'Enter your password'
            onChangeText = {value => passwordRef.current = value}
            secureTextEntry
          />
          {/* Button submit */}
          <Button title={'Sign Up'} loading={loading} onPress={onSubmit}/>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account!
          </Text>
          <Pressable onPress={() => router.push('login')}>
            <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>     
    </ScreenWrapper>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container:{
    flex:1,
    gap:45,
    paddingHorizontal: wp(5)
  },
  welcomeText:{
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text
  },
  form:{
    gap:25
  },
  forgotPassword: {
    textAlign:'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    marginVertical: 12
  },
  footer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    gap: 5
  },
  footerText: {
    textAlign:'center',
    color: theme.colors.text,
    fontSize: hp(1.6)
  }
})