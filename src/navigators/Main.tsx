import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../screens/Home'
import Exchanges from '../screens/Exchanges'
import Markets from '../screens/Markets'
import Favourites from '../screens/Favourites'
import Settings from '../screens/Settings'
import TabBarIcon from '../components/TabBarIcon'
import icons from '../constants/icons'
import { useAppSelector } from '../hooks/redux'
import colors from '../constants/colors'

const MainTab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  const initialScreen = useAppSelector((state) => state.settings.initialScreen)
  return (
    <MainTab.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.backgroundPrimary,
          height: 50,
          borderTopWidth: 0
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: 'bold',
          paddingBottom: 3
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#62727b',
        headerShown: false
      }}
    >
      <MainTab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.home} focused={focused} />,
        }}
      />
      <MainTab.Screen 
        name="Markets" 
        component={Markets}
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.markets} focused={focused} />,
        }} 
      />
      <MainTab.Screen 
        name="Favourites" 
        component={Favourites} 
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.fav} focused={focused} />,
        }}
      />
      <MainTab.Screen 
        name="Exchanges" 
        component={Exchanges} 
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.exchanges} focused={focused} />,
        }}
      />
      <MainTab.Screen 
        name="Settings" 
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => 
            <TabBarIcon iconSrc={icons.settings} focused={focused} />,     
        }} 
      />
    </MainTab.Navigator>
  )
}

export default MainNavigator
