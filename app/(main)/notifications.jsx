import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import { fetchNotifications } from '../../services/notificationService';
import { hp, wp } from '../../helpers/common';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../../components/ScreenWrapper';
import { ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import NotificationItem from '../../components/NotificationItem';
import Header from '../../components/Header';

const Notifications = () => {

  const [notifications, setNotification] = useState([]);
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    getNotifications();
  },[])

  const getNotifications = async () => {
    let res = await fetchNotifications(user.id);
    //console.log('notification: ', res);
    if(res.success) setNotification(res.data);
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title='Notification' />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listStyle}>
          {
            notifications.map(item => {
              return(
                <NotificationItem 
                  item={item}
                  key= {item?.id}
                  router= {router}
                />
              )
            })
          }
          {
            notifications.length == 0 && (
              <Text style={[styles.noData, {textAlign:'center'}]}>No notification yet</Text>
            )
          }
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: wp(4),
  },
  listStyle: {
    paddingVertical: 20,
    gap:10
  },
  noData:{
    fontSize: hp(1.8),
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
  }
})