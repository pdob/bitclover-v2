import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
  useAnimatedStyle,
  cancelAnimation,
  withDelay
} from 'react-native-reanimated'
import colors from '../constants/colors'

const Loader = () => {
  const dot1Color = useSharedValue(colors.text)
  const dot2Color = useSharedValue(colors.text)
  const dot3Color = useSharedValue(colors.text)

  const animateDots = () => {
    dot1Color.value = withDelay(100, 
      withRepeat(
        withTiming(colors.backgroundPrimary, {
          duration: 500,
          easing: Easing.in(Easing.linear)
        }),
        -1,
        true
      )
    )

    dot2Color.value = withDelay(200, 
      withRepeat(
        withTiming(colors.backgroundPrimary, {
          duration: 500,
          easing: Easing.in(Easing.linear)
        }),
        -1,
        true
      )
    )

    dot3Color.value = withDelay(300, 
      withRepeat(
        withTiming(colors.backgroundPrimary, {
          duration: 500,
          easing: Easing.in(Easing.linear)
        }),
        -1,
        true
      )
    )
  }
  
  
  useEffect(() => {
    animateDots()
    return () => {
      cancelAnimation(dot1Color)
      cancelAnimation(dot2Color)
      cancelAnimation(dot3Color)
    }
  }, [])

  const dot1Style = useAnimatedStyle(() => {
    return {
      backgroundColor: dot1Color.value,
    }
  })

  const dot2Style = useAnimatedStyle(() => {
    return {
      backgroundColor: dot2Color.value,
    }
  })

  const dot3Style = useAnimatedStyle(() => {
    return {
      backgroundColor: dot3Color.value,
    }
  })

  return (
    <View 
      style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        flex: 1, 
        justifyContent: 'center' 
      }}
      testID="loader"
    >
      <Animated.View
        style={[
          {
            height: 12,
            width: 12,
            borderRadius: 50,
            marginRight: 3,
          },
          dot1Style
        ]}
      />
      <Animated.View
        style={[
          {
            height: 12,
            width: 12,
            borderRadius: 50,
            marginRight: 3,
          },
          dot2Style
        ]}
      />
      <Animated.View
        style={[
          {
            height: 12,
            width: 12,
            borderRadius: 50,
            marginRight: 3,
          },
          dot3Style
        ]}
      />
    </View>
  )
}

export default Loader
