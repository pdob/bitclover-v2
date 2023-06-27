import React, { useState } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import colors from '../constants/colors'
import Separator from './Separator'


const DropdownMenu = ({
  options,
  currentValue,
  onSelect,
  testId
} : {
  options: string[]
  currentValue: string
  onSelect: (item: string) => void
  testId?: string
}) => {

  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>(currentValue)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: withSpring(openDropdown ? '180deg' : '0deg')}],
    }
  })

  return (
    <Pressable
      onPress={() => {
        setOpenDropdown(!openDropdown)
      }}
      style={styles.background}
      testID={testId}
    >
      <View style={styles.option}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={styles.text}
          >
            {selectedItem}
          </Text>
          {options.length > 1 ? (
            <Animated.Image
              style={[{ height: 20, width: 20 }, animatedStyles]}
              source={require('../assets/chevron-down.png')}
            />
          ) : null}
        </View>
      
        <Animated.View >
          {openDropdown ? (
            <View
              style={{
                width:           '100%',
                top:             20,
                marginBottom:    20,
              }}
            >
              <Separator
                color={colors.separator}
              />
            </View>
          ) : null}
            
          {openDropdown ? options.map((option, index) => (
            <Pressable 
              key={index}
              style={{ paddingVertical: 10, flexDirection: 'row' }}
              onPress={() => {
                setSelectedItem(option)
                onSelect(option)
              }}
            >
              <Text
                style={[styles.text, {
                  fontWeight: selectedItem === option ? '700' : '400',
                  fontSize: selectedItem === option ? 15 : 14
                }]}
                
              >
                {option}
              </Text>
            </Pressable>
          )) : null}
        </Animated.View>
      </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  background: {
    backgroundColor:  colors.backgroundTernary,
    borderRadius: 10
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical:   20,
    borderRadius:      10,
    borderWidth:       0.5,
    borderColor:       colors.text,
  },
  text: {
    color: colors.text,
    fontWeight: '600',
    fontSize: 14
  }
})

export default DropdownMenu
