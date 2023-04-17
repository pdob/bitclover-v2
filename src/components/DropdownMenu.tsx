import React, { ReactElement, useRef, useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated'
import Separator from './Separator'

export type DropdownOption = {
  key: string,
  value: string,
  Icon?: ReactElement
}

const DropdownMenu = ({
  options,
  placeholder,
  onSelect,
  initialItemIndex,
} : {
  options: DropdownOption[]
  placeholder: string
  onSelect: (item: DropdownOption) => void
  initialItemIndex?: number
}) => {

  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<DropdownOption>()

  const offset = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: '180deg' }],
    }
  })


  useEffect(() => {
    if ((initialItemIndex || initialItemIndex === 0) && ((initialItemIndex + 1) <= options.length)) {
      setSelectedItem(options[initialItemIndex])
    } else if (options.length === 1) {
      setSelectedItem(options[0])
    }
  }, [initialItemIndex, options])

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
          {selectedItem?.Icon}
          <Text
            style={{
              paddingLeft: selectedItem?.Icon ? 15 : 0,
              color: 'black'
            }}
          >
            {selectedItem?.value || placeholder}
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
                color='grey'
              />
            </View>
          ) : null}
            
          {openDropdown ? options.map((option) => (
            <Pressable 
              key={option.key} 
              style={{ paddingVertical: 10, flexDirection: 'row' }}
              onPress={() => {
                setSelectedItem(option)
                onSelect(option)
              }}
            >
              <Text
                style={{
                  color: selectedItem?.key === option.key ? 'red' : 'black'
                }}
              >
                {option.value}
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
    backgroundColor:  '#E5E5E5'
  },
  option: {
    paddingHorizontal: 15,
    paddingVertical:   20,
    borderRadius:      10,
    borderWidth:       0.3,
    borderColor:       'black',
  }
})

export default DropdownMenu
