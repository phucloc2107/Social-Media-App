import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import {hp, wp} from '../helpers/common'
import {theme} from '../constants/theme'
import Button from '../components/Button'

const Welcome = () => {
  return (
    <ScreenWrapper bg='white'>
        <StatusBar style='dark' />
        <View style={styles.container}>
            {/* welcome image */}
            <Image style={styles.welcomeImage} resizeMode='contain' source={require('../assets/images/welcomeImage.jpg')} />

            {/* title */}
            <View style={{marginVertical: 30}}>
                <Text style={styles.title}>JoinUs!</Text>
                <Text style={styles.punchline}>
                    Where every thought finds a home and every image tells a story.
                </Text>
            </View>

            {/* footer */}
            <View style={styles.footer}>
                <Button 
                    title='Getting Started'
                    buttonStyle={{marginHorizontal: wp(3)}}
                    onPress={() => {}}
                />
                <View style={styles.buttomTextContainer}>
                    <Text style={styles.loginText}>
                        Already have an account! 
                    </Text>
                    <Pressable>
                        <Text style={[styles.loginText, {color:theme.colors.primaryDark, fontWeight:theme.fonts.semibold}]}>
                             Login
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        paddingHorizontal: wp(4)
    },
    welcomeImage:{
        height: hp(30),
        width: wp(100),
        alignSelf: 'center',
        backgroundColor:'none'
    },
    title:{
        color: theme.colors.text,
        fontSize: hp(4),
        textAlign:'center',
        fontWeight: theme.fonts.extraBold
    },
    punchline:{
        textAlign:'center',
        paddingHorizontal: wp(10),
        fontSize: hp(1.7),
        color: theme.colors.text
    },
    footer:{
        marginTop: 30,
        width:'100%'
    },
    buttomTextContainer:{
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:'center',
        marginTop: 15
    },
    loginText:{
        textAlign:'center',
        color: theme.colors.text,
        fontSize: hp(1.6)
    }
})