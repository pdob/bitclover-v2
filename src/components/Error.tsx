import React from 'react'
import { View, Text, Image } from 'react-native'
import colors from '../constants/colors'

const Error = ({ error } : { error: string }) => (
  <View 
    style={{ 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}
    testID="error"
  >
    <Image 
      source={require('../assets/error.png')}
      style={{ height: 75, width: 75 }}
    />
    <Text style={{ color: colors.text, fontSize: 16, fontWeight: '500', padding: 30 }}>
      {error} 
    </Text>
  </View>
)

export default Error

