import React from 'react'
import { View } from 'react-native'

const Separator = ({
  color = 'grey',
  paddingHorizontal = 0
}) => {

  return (
    <View style={{ paddingHorizontal, backgroundColor: 'grey' }}>
      <View
        style={{
          height:           0.5,
          backgroundColor:  'grey'
        }}
      />
    </View>
  )
}

export default Separator