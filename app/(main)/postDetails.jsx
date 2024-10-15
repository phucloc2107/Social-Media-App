import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import {hp, wp} from '../../helpers/common'
import { theme } from '../../constants/theme'
import { fetchPostDetails } from '../../services/postService'

const postDetails = () => {

    const {postId} = useLocalSearchParams();
    console.log('got post ID: ', postId);

    const [post, setPost] = useState(null);

    useEffect(() => {
        getPostDetails();
    },[])

    const getPostDetails = async() => {
        // fetch post details here
        let res = await fetchPostDetails(postId);
        console.log('got post details: ', res)
    }

    return (
        <View>
            <Text>postDetails</Text>
        </View>
    )
}

export default postDetails

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
        paddingVertical: wp(7),
    },
    inputContainer: {
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    list: {
        paddingHorizontal: wp(4)
    },
    sendIcon: {
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 0.8,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radius.lg,
        borderCurve:'continuous',
        height: hp(5.8),
    },
    center:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    notFound: {
        fontSize: hp(2.5),
        color: theme.colors.text,
        fontWeight: theme.fonts.medium
    },
    loading: {
        height: hp(5.8),
        width: hp(5.8),
        justifyContent:'center',
        alignItems:'center',
        transform: [{scale: 1.3}]
    }
})