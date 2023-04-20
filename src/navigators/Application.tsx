import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import MainNavigator from './Main'
import { useFlipper } from '@react-navigation/devtools'
import { ApplicationStackParamList } from '../types/Navigation'
import colors from '../constants/colors'
import CoinInfo from '../screens/CoinInfo'

const Stack = createNativeStackNavigator<ApplicationStackParamList>()

// @refresh reset
const ApplicationNavigator = () => {

  const navigationRef = useNavigationContainerRef()

  useFlipper(navigationRef)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
      <NavigationContainer>
        <StatusBar/>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainNavigator} />
          <Stack.Screen name="CoinInfo" component={CoinInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
