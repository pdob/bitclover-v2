import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native'
import MainNavigator from './Main'
import { useFlipper } from '@react-navigation/devtools'
import { ApplicationStackParamList } from '../types/navigation'

const Stack = createNativeStackNavigator<ApplicationStackParamList>()

// @refresh reset
const ApplicationNavigator = () => {

  const navigationRef = useNavigationContainerRef()

  useFlipper(navigationRef)

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <NavigationContainer>
        <StatusBar/>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default ApplicationNavigator
