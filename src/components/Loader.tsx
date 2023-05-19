import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  withRepeat,
  useAnimatedStyle,
  cancelAnimation,
  withSequence
} from 'react-native-reanimated'
import colors from '../constants/colors'

const Loader = () => {
  const dot1Color = useSharedValue(colors.text)
  const dot2Color = useSharedValue(colors.text)
  const dot3Color = useSharedValue(colors.text)

  const animateDots = () => {
    const duration = 500
    const delay = 100 

    //workaround since withRepeat doesn't work with withDelay in Reanimated

    dot1Color.value = withRepeat(
      withSequence(
        withTiming(colors.backgroundPrimary, {
          duration,
          easing: Easing.in(Easing.linear),
        }),
        withTiming(colors.text, {
          duration,
          easing: Easing.in(Easing.linear),
        })
      ),
      -1,
      true
    )
  
    dot2Color.value = withRepeat(
      withSequence(
        withTiming(colors.text, {
          duration: duration - delay,
          easing: Easing.in(Easing.linear),
        }),
        withTiming(colors.backgroundSecondary, {
          duration,
          easing: Easing.in(Easing.linear),
        }),
        withTiming(colors.text, {
          duration,
          easing: Easing.in(Easing.linear),
        })
      ),
      -1,
      true
    )
  
    dot3Color.value = withRepeat(
      withSequence(
        withTiming(colors.text, {
          duration: duration - 2 * delay,
          easing: Easing.in(Easing.linear),
        }),
        withTiming(colors.text, {
          duration: duration - delay,
          easing: Easing.in(Easing.linear),
        }),
        withTiming(colors.backgroundTernary, {
          duration,
          easing: Easing.in(Easing.linear),
        }),
        withTiming(colors.text, {
          duration,
          easing: Easing.in(Easing.linear),
        })
      ),
      -1,
      true
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
    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
      <Animated.View
        style={[
          {
            height: 12,
            width: 12,
            borderRadius: 50,
            marginRight: 3,
          },
          dot1Style,
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
          dot2Style,
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
          dot3Style,
        ]}
      />
    </View>
  )
}

export default Loader
