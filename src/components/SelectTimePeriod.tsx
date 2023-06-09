import React, { SetStateAction, Dispatch } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable 
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming, 
  Easing
} from 'react-native-reanimated'
import colors from '../constants/colors'
import { TimePeriod } from '../screens/CoinInfo'

const SelectTimePeriod = ({ 
  buttons, 
  onPress 
} : { 
  buttons: Array<string | number> 
  onPress: Dispatch<SetStateAction<TimePeriod>>
}) => {
  const activeIndex = useSharedValue(0)
  const buttonWidth = 50

  const handlePress = (index: number) => {
    activeIndex.value = index
    onPress(buttons[index] as TimePeriod)
  }

  const buttonStyle = (index: number) => {
    const animatedStyle = useAnimatedStyle(() => {
      const isActive = activeIndex.value === index
      const backgroundColor = isActive ? colors.backgroundTernary : 'transparent'

      return {
        backgroundColor: withTiming(backgroundColor, { duration: 800, easing: Easing.in(Easing.ease) })
      }
    })
    return animatedStyle
  }

  const getPeriodLabel = (period: TimePeriod) => {
    switch(period) {
    case 1:
    case 7:
    case 30:
    case 60:
      return `${period}D`
    case 365:
      return '1Y'
    case 'max':
      return period.toUpperCase()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Animated.View style={styles.buttonsWrapper}>
          {buttons.map((label, index) => (
            <Pressable
              key={index}
              onPress={() => handlePress(index)}
            >
              <Animated.View
                style={[styles.button, { width: buttonWidth }, buttonStyle(index)]}
              >
                <Text style={styles.buttonText}>{getPeriodLabel(label as TimePeriod)}</Text>
              </Animated.View>
            </Pressable>
          ))}
        </Animated.View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10
  },
  buttonsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonsWrapper: {
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: '700',
    color: colors.text,
    fontSize: 13.5
  },
})

export default SelectTimePeriod
