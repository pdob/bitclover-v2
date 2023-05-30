import React from 'react'
import { Pressable, Text } from 'react-native'
import colors from '../constants/colors'

const Button = ({buttonText, onPress}: {buttonText: string, onPress: () => void}) => (
  <Pressable 
    style={{ 
      height: 50, 
      width: 125, 
      backgroundColor: colors.backgroundTernary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: colors.text
      
    }} 
    onPress={onPress}
  >

    <Text style={{ color: colors.text, fontWeight: '500', fontSize: 16 }}>
      {buttonText}
    </Text>
  </Pressable>
)

export default Button