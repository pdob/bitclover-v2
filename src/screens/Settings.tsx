import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import DropdownMenu from '../components/DropdownMenu'
import HomeHeader from '../components/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { changeCurrency, changeInitialScreen } from '../store/slices/settingsSlice'
import colors from '../constants/colors'

const Settings = () => {
  const dispatch = useAppDispatch()
  const currency = useAppSelector((state) => state.settings.currency)
  const initialScreen = useAppSelector((state) => state.settings.initialScreen)

  return (
    <SafeAreaView style={styles.background}>
      <HomeHeader />
      <View style={{ padding: 15 }}>
        <View style={{ paddingBottom: 20 }}>
          <Text style={styles.headingText}>
            Default Currency
          </Text>
          <DropdownMenu
            currentValue={currency} 
            options={['GBP', 'USD', 'EUR']}
            onSelect={(item) => dispatch(changeCurrency(item))}
          />
        </View>
        <View>
          <Text style={styles.headingText}>
            Initial Screen
          </Text>
          <DropdownMenu
            currentValue={initialScreen} 
            options={['Home', 'Markets', 'Exchanges', 'Favourites', 'Settings']}
            onSelect={(item) => dispatch(changeInitialScreen(item))}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1
  },
  headingText: {
    color: colors.text,
    fontSize: 20
  }
})

export default Settings