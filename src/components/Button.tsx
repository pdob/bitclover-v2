import React from 'react'
import { Pressable, Text } from 'react-native'
import colors from '../constants/colors'

const Button = ({buttonText, onPress}: {buttonText: string, onPress: () => void}) => (
  <Pressable 
    style={{ 
      height: 50, 
      width: 150, 
      backgroundColor: colors.backgroundTernary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      
    }} 
    onPress={onPress}
  >

    <Text style={{ color: colors.text, fontWeight: '500', fontSize: 20 }}>
      {buttonText}
    </Text>
  </Pressable>
)

export default Button