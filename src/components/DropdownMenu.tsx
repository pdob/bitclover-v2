import React, { ReactElement, useRef, useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated'
import colors from '../constants/colors'
import Separator from './Separator'


const DropdownMenu = ({
  options,
  currentValue,
  onSelect,
  initialItemIndex,
} : {
  options: string[]
  currentValue: string
  onSelect: (item: string) => void
  initialItemIndex?: number
}) => {

  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>(currentValue)

  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: '180deg' }],
    }
  })


  return (
    <Pressable
      onPress={() => {
        setOpenDropdown(!openDropdown)
      }}
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
            {selectedItem}
          </Text>
          {options.length > 1 ? (
            <Animated.Image
              style={[{ height: 20, width: 20 }]}
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
            
          {openDropdown ? options.map((option) => (
            <Pressable 
              key={Math.random() * 1231231}
              style={{ paddingVertical: 10, flexDirection: 'row' }}
              onPress={() => {
                setSelectedItem(option)
                onSelect(option)
              }}
            >
              <Text
                style={{
                  color: selectedItem === option ? '#060907' : colors.text,
                  fontWeight: selectedItem === option ? '600' : '400'
                }}
                
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
    borderWidth:       0.3,
    borderColor:       'black',
  },
  text: {
    color: colors.text
  }
})

export default DropdownMenu
