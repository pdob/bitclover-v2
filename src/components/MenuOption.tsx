import React from 'react'
import { 
  View, 
  Text,
  Pressable, 
  StyleSheet, 
  Image 
} from 'react-native'
import colors from '../constants/colors'

const MenuOption = ({
  option,
  onPress,
  testId
} : {
  option: string
  onPress: () => void,
  testId?: string
}) => {

  return (
    <Pressable
      onPress={onPress}
      style={styles.background}
      testID={testId}
    >
      <View style={styles.option}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.text}>
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
    marginBottom: 10,
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical:   20,
    borderRadius:      10,
    borderWidth:       0.5,
    borderColor:       colors.text
  },
  text: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14
  }
})

export default MenuOption
