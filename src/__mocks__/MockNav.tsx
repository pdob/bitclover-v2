import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
const MockNav = ({
  component,
  params = {}
} : {
  component: any,
  params?: any
}) => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="MockScreen"
        component={component}
        initialParams={params}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default MockNav
