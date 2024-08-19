import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'

const login = () => {
  return (
    <ScreenWrapper>
      <Text>login</Text>
      <Icon name='home' color='red' />
    </ScreenWrapper>
  )
}

export default login

const styles = StyleSheet.create({})