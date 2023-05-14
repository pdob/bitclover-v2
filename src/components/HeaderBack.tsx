import React from 'react'
import { View, Pressable, Image } from 'react-native'
import colors from '../constants/colors'
import { useNavigation } from '@react-navigation/native'

const HeaderBack = () => {
  const navigation = useNavigation()
  return (
    <View style={{ backgroundColor: colors.backgroundPrimary, height: 50 }}>
      <Pressable 
        style={{ padding: 7 , justifyContent: 'center' }}
        onPress={() => navigation.goBack()}
      >
        <Image 
          source={require('../assets/chevron-left.png')}
          style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center' }}
        />
      </Pressable>
    </View>
  )}

export default HeaderBack