import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {hp, wp} from '../../helpers/common'
import { theme } from '../../constants/theme'
import { fetchPostDetails } from '../../services/postService'
import PostCard from '../../components/PostCard'
import { useAuth } from '../../contexts/AuthContext'
import Loading from '../../components/Loading'

const postDetails = () => {

    const {postId} = useLocalSearchParams();
    const {user} = useAuth();
    const router = useRouter();
    console.log('got post ID: ', postId);

    const [post, setPost] = useState(null);
    const [startLoading, setStartLoading] = useState(true);

    useEffect(() => {
        getPostDetails();
    },[])

    const getPostDetails = async() => {
        // fetch post details here
        let res = await fetchPostDetails(postId);
        // console.log('got post details: ', res)
        if (res.success) setPost(res.data);
            setStartLoading(false);
    }

    if(startLoading) {
        return(
            <View style={styles.center}>
                <Loading />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} >
                <PostCard 
                    item={post}
                    currentUser={user}
                    router={router}
                    hasShadow={false}
                    showMoreIcon = {false}
                />
            </ScrollView>
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