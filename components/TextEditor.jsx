import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'

const TextEditor = ({editorRef, onChange}) => {
  return (
    <View style={{minHeight: 285}}>
        <RichToolbar 
            actions= {[
                actions.setStrikethrough,
                actions.removeFormat,
                actions.setBold,
                actions.setItalic,
                actions.insertOrderedList,
                actions.blockquote,
                actions.alignLeft,
                actions.alignCenter,
                actions.alignRight,
                actions.code,
                actions.line,
                actions.heading1,
                actions.heading4
            ]}
            iconMap = {{
                [actions.heading1]: ({tinColor}) => <Text style={{color:tinColor}}>H1</Text>,
                [actions.heading4]: ({tinColor}) => <Text style={{color:tinColor}}>H4</Text>,
            }}
            style={styles.richBar}
            flatContainerStyle = {styles.flatStyle}
            selectedIconTint = {theme.colors.primaryDark}
            editor= {editorRef}
            disabled = {false}
        />

            <RichEditor 
                ref={editorRef}
                containerStyle= {styles.rich}
                editorStyle={styles.contentStyle}
                placeholder={"What's on your mind?"}
                onChange={onChange}
            />
    </View>
  )
}

export default TextEditor

const styles = StyleSheet.create({
    richBar: {
        borderTopRightRadius: theme.radius.xl,
        borderTopLeftRadius: theme.radius.xl,
        backgroundColor: theme.colors.gray
    },
    rich: {
        minHeight: 240,
        flex:1,
        borderWidth: 1.5,
        borderTopWidth:0,
        borderBottomLeftRadius: theme.radius.xl,
        borderBottomRightRadius: theme.radius.xl,
        borderColor: theme.colors.gray,
        padding:5
    },
    contentStyle: {
        color: theme.colors.textDark,
        placeholder: 'gray'
    },
    flatStyle:{
        paddingHorizontal:8,
        marginVertical:3
    }
})