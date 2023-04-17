import React from 'react'
import { View, Text, Pressable } from 'react-native'
import DropdownMenu from '../components/DropdownMenu'
import HomeHeader from '../components/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { changeCurrency, changeInitialScreen } from '../store/slices/settingsSlice'

const Settings = () => {
  const dispatch = useAppDispatch()
  const currency = useAppSelector((state) => state.settings.currency)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeHeader />
      <View style={{ padding: 15 }}>
        <View style={{ paddingBottom: 20 }}>
          <Text>
            Default Currency: {currency}
          </Text>
          <DropdownMenu 
            options={[{key: '1', value: 'GBP'}, {key: '2', value: 'USD'}]}
            placeholder="Yoyo siema tu pasiu"
            initialItemIndex={0}
            onSelect={(item) => dispatch(changeCurrency(item.value))}
          />
        </View>
        <View>
          <Text>
            Initial Screen
          </Text>
          <DropdownMenu 
            options={[{key: '1', value: 'Home'}, {key: '2', value: 'Markets'}]}
            placeholder="Yoyo siema tu pasiu"
            initialItemIndex={0}
            onSelect={(item) => dispatch(changeInitialScreen(item.value))}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Settings