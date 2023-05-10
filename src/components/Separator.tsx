import React from 'react'
import { View } from 'react-native'
import colors from '../constants/colors'

const Separator = ({
  color = colors.separator
} : {
  color: string
}) => {
  return (
    <View
      style={{
        height:           0.5,
        backgroundColor:  color
      }}
    />
  )
}

export default Separator