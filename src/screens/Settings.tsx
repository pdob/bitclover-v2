import React from 'react'
import { View, Text, Pressable, StyleSheet, ScrollView, Linking } from 'react-native'
import DropdownMenu from '../components/DropdownMenu'
import HomeHeader from '../components/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { changeCurrency, changeInitialScreen } from '../store/slices/settingsSlice'
import colors from '../constants/colors'
import MenuOption from '../components/MenuOption'

const Settings = () => {
  const dispatch = useAppDispatch()
  const currency = useAppSelector((state) => state.settings.currency)
  const initialScreen = useAppSelector((state) => state.settings.initialScreen)

  return (
    <SafeAreaView style={styles.background}>
      <HomeHeader />
      <ScrollView style={{ padding: 15, flex: 1 }}>
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
        <View style={{ paddingTop: 20, flex: 1 }}>
          <Text style={styles.headingText}>About</Text>
          <MenuOption option='Contact us' onPress={() => Linking.openURL('mailto: bitcloveruk@gmail.com')}/>
          <MenuOption option='Privacy policy' />
          <MenuOption option='Terms of use' />
          <MenuOption option='Rate BitClover' />
        </View>
      </ScrollView>
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
    fontSize: 23,
    paddingBottom: 5,
    fontWeight: '500'
  }
})

export default Settings