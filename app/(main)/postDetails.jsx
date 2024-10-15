import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {hp, wp} from '../../helpers/common'
import { theme } from '../../constants/theme'
import { createComment, fetchPostDetails } from '../../services/postService'
import PostCard from '../../components/PostCard'
import { useAuth } from '../../contexts/AuthContext'
import Loading from '../../components/Loading'
import Input from '../../components/Input'
import { TouchableOpacity } from 'react-native'
import Icon from '../../assets/icons'

const postDetails = () => {

    const {postId} = useLocalSearchParams();
    const {user} = useAuth();
    const router = useRouter();
    const inputRef = useRef(null);
    const commentRef = useRef('');
    
    const [post, setPost] = useState(null);
    console.log('post details: ', post);
    const [startLoading, setStartLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     getPostDetails();
    // },[])
    useEffect(() => {
        if (postId) {
            getPostDetails(); // Fetch post details only when postId is defined
        } 
    }, [postId]);

    const getPostDetails = async() => {
        // fetch post details here
        let res = await fetchPostDetails(postId);
        // console.log('got post details: ', res)
        if (res.success) 
            setPost(res.data);
        setStartLoading(false);
    }

    const onNewComment = async () => {
        if (!commentRef.current) return null;
        let data = {
            userId: user?.id,
            postId: post?.id,
            text: commentRef.current
        }
        // create comment
        setLoading(true);
        let res = await createComment(data);
        setLoading(false);
        if (res.success) {
            // send notification later
            inputRef?.current?.clear();
            commentRef.current = '';
        } else {
            Alert.alert('Comment', res.msg);
        }
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
                {post ? (
                    <PostCard
                        item={{...post, comments: [{count: post.comments.length}]}}
                        currentUser={user}
                        router={router}
                        hasShadow={false}
                        showMoreIcon={false}
                    />
                ) : (
                    <Text style={styles.notFound}>Post not found</Text> // Handle missing post
                )}

                {/* comment input */}
                <View style={styles.inputContainer}>
                    <Input 
                        inputRef={inputRef}
                        placeholder= 'Type comment...'
                        onChangeText={value => commentRef.current = value}
                        placeholderTextColor = {theme.colors.textLight}
                        containerStyle = {{flex:1, height: hp(6.2), borderRadius: theme.radius.xl}}
                    />
                    {
                        loading ? (
                            <View>
                                <Loading size='small' />
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.sendIcon} onPress={onNewComment}>
                                <Icon name='send' color={theme.colors.primaryDark}/>
                            </TouchableOpacity>
                        )
                    }
                </View>
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
        gap: 10
    },
    list: {
        paddingHorizontal: wp(4)
    },
    sendIcon: {
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 0.8,
        backgroundColor: 'white',
        borderRadius: theme.radius.lg,
        borderCurve:'continuous',
        borderColor:theme.colors.primary,
        height: hp(5.8),
        width: hp(5.8)
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