import { LogBox, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { getUserData } from '../services/userService'

LogBox.ignoreLogs(['Warning: TNodeChildrenRenderer','Warning: MemoizedTNodeRenderer','Warning: TRenderEngineProvider'])
const  _layout = () => {
  return(
    <AuthProvider>
      <MainLayout />  
    </AuthProvider>
  )
}

const MainLayout = () => {
  
  const {setAuth, setUserData} = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('session user: ', session?.user?.id);

      if (session) {
        // set Auth
        setAuth(session?.user);
        updataUserData(session?.user, session?.user.email);
        // move to home screen
        router.replace('/home');
      } else {
        // set Auth null
        setAuth(null);
        // move to welcome screen
        router.replace('./welcome');
      }
    })
  },[])

  const  updataUserData = async(user, email) => {
    let res = await getUserData(user?.id);
    // console.log('got user data: ', res)
    if(res.success) setUserData({...res.data, email});
  }

  return (
    <Stack 
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen 
          name='(main)/postDetails'
          options={{
            presentation: 'transparentModal'
          }}
        />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})