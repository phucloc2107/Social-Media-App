import { Alert, StyleSheet, Text, View , Button} from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabase'

const home = () => {

    const {setAuth} = useAuth();

    const onLogout = async() => {
        //setAuth(null);
        const {error} = await supabase.auth.signOut();
        if (error) {
            Alert.alert('Sign out', 'Error signing out!')
        }
    }

    return (
        <ScreenWrapper>
            <Text>home</Text>
            <Button title='logout' onPress={onLogout} />
        </ScreenWrapper>
    )
}

export default home

const styles = StyleSheet.create({})