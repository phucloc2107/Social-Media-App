import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { hp, wp } from '../helpers/common'
import Avatar from './Avatar'
import moment from 'moment'
import Icon from '../assets/icons'
import RenderHtml from 'react-native-render-html';
import { Image } from 'expo-image'
import { getSupabaseFileUrl } from '../services/imageService'
import { Video } from 'expo-av'

const textStyle = {
    color: theme.colors.dark,
    fontSize: hp(1.75)
}

const tagsStyles = {
    div: textStyle,
    p: textStyle,
    ol: textStyle,
    h1: {
        color: theme.colors.dark
    },
    h4: {
        color: theme.colors.dark
    }
}

const PostCard = ({item, currentUser, router, hasShadow = true}) => {
    const shadowStyles = {
        shadowOffset: {
            width:0,
            height:2
        },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation:1
    }

    const openPostDetails = () => {

    }

    const createdAt = moment(item?.created_at).format('MMM D');
    const likes = [];
    const liked = false;

    return (
        <View style={[styles.container, hasShadow && shadowStyles]}>
            <View style={styles.header}>
                {/* user info and post time */}
                <View style={styles.userInfo}>
                    <Avatar 
                        size={hp(4.5)}
                        uri={item?.user?.image}
                        rounded={theme.radius.md}
                    />
                    <View style={{gap:2}}>
                        <Text style={styles.userName}>{item?.user?.name}</Text>                        
                        <Text style={styles.postTime}>{createdAt}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={openPostDetails}>
                    <Icon name='threeDotsHorizontal' size={hp(3.4)} strokeWidth={3} color={theme.colors.text} />
                </TouchableOpacity>
            </View>

            {/* Post body & media */}
            <View style={styles.content}>
                <View style={styles.postBody}>
                    {
                        item?.body && (
                            <RenderHtml 
                                contentWidth={wp(100)}
                                source={{html: item?.body}}
                                tagsStyles={tagsStyles}
                            />
                        )
                    }
                </View>

                {/* Post image */}
                {
                    item?.file && item?.file?.includes('postImages') && (
                        <Image 
                            source={getSupabaseFileUrl(item?.file)}
                            transition={100}
                            style={styles.postMedia}
                            contentFit='cover'
                        />
                    )
                }

                {/* Post video */}
                {
                    item?.file && item?.file?.includes('postVideos') && (
                        <Video 
                            source={getSupabaseFileUrl(item?.file)}
                            style={[styles.postMedia, {height: hp(30)}]}
                            resizeMode='cover'
                            useNativeControls
                            isLooping
                        />
                    )
                }
            </View>

            {/* Like, comment and share */}
            <View style={styles.footer}>
                <View style={styles.footerButton}>
                    <TouchableOpacity>
                        <Icon name='heart' size={24} color={liked ? theme.colors.rose : theme.colors.textLight } fill={liked ? theme.colors.rose : 'transparent'} />
                    </TouchableOpacity>
                    <Text style={styles.count}>
                        {
                            likes?.length
                        }
                    </Text>
                </View>
                <View style={styles.footerButton}>
                    <TouchableOpacity>
                        <Icon name='comment' size={24} color={theme.colors.textLight } />
                    </TouchableOpacity>
                    <Text style={styles.count}>
                        {
                            0
                        }
                    </Text>
                </View>
                <View style={styles.footerButton}>
                    <TouchableOpacity>
                        <Icon name='share' size={24} color={theme.colors.textLight } />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PostCard

const styles = StyleSheet.create({
    container: {
        gap:10,
        marginBottom: 15,
        borderRadius: theme.radius.xxl*1.1,
        borderCurve: 'continuous',
        padding:10,
        paddingVertical:12,
        backgroundColor:'white',
        borderWidth: 0.5,
        borderColor: theme.colors.gray,
        shadowColor: '#000',
    },
    header:{
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    userInfo: {
        flexDirection:'row',
        alignItems:'center',
        gap:8,
    },
    userName: {
        fontSize: hp(1.7),
        color: theme.colors.textDark,
        fontWeight: theme.fonts.medium
    },
    postTime: {
        fontSize: hp(1.7),
        color: theme.colors.textDark,
        fontWeight: theme.fonts.medium
    },
    content: {
        gap:10,
        //marginBottom: 10
    },
    postMedia: {
        height: hp(40),
        width: '100%',
        borderRadius: theme.radius.xl,
        borderCurve: 'continuous'
    },
    postBody:{
        marginLeft: 5
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap:15
    },
    footerButton: {
        marginLeft:5,
        flexDirection:'row',
        alignItems:'center',
        gap:4
    },
    actions: {
        flexDirection:'row',
        alignItems:'center',
        gap:18
    },
    count: {
        color: theme.colors.text,
        fontSize: hp(1.8)
    }
})