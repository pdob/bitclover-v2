import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import colors from '../constants/colors'

const Loader = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator color={colors.backgroundTernary} size='large' />
  </View>
)

export default Loader