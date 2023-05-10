import React from 'react'
import { View, Text } from 'react-native'
import colors from '../constants/colors'

const ListEmpty = ({message} : {message: string}) => (
  <View style={{ flex: 1 }}>
    <Text style={{ color: colors.text, fontWeight: '600', fontSize: 15, paddingLeft: 10 }}>
      {message}
    </Text>
  </View>
)

export default ListEmpty