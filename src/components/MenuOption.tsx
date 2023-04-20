import React from 'react'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import colors from '../constants/colors'

const MenuOption = ({
  option,
  onPress
} : {
  option: string
  onPress: () => void
}) => {

  return (
    <Pressable
      onPress={onPress}
      style={styles.background}
    >
      <View style={styles.option}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              color: colors.text
            }}
          >
            {option}
          </Text>
          
          <Image
            style={[{ height: 20, width: 20 }]}
            source={require('../assets/chevron-right.png')}
          />
          
        </View>
      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundTernary,
    borderRadius: 10,
    marginBottom: 10
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical:   20,
    borderRadius:      10,
    borderWidth:       0.5,
    borderColor:       'white',
  },
  text: {
    color: colors.text
  }
})

export default MenuOption
