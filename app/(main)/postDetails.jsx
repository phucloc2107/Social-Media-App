import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const postDetails = () => {

    const {postId} = useLocalSearchParams();
    console.log('got post ID: ', postId);

    return (
        <View style={{height:'100%', backgroundColor:'black'}}>
            <Text>postDetails</Text>
        </View>
    )
}

export default postDetails

const styles = StyleSheet.create({})