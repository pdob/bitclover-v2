import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import MainNavigator from './Main'
import { useFlipper } from '@react-navigation/devtools'
import { AppStackParamsList } from '../types/navigation'
import colors from '../constants/colors'
import CoinInfo from '../screens/CoinInfo'
import Privacy from '../screens/Privacy'
import Terms from '../screens/Terms'
import RNBootSplash from 'react-native-bootsplash'

const Stack = createNativeStackNavigator<AppStackParamsList>()

const ApplicationNavigator = () => {

  const navigationRef = useNavigationContainerRef()
  useFlipper(navigationRef)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
      <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true })}>
        <StatusBar/>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="CoinInfo" component={CoinInfo} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Terms" component={Terms} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
