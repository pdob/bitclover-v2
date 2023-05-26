import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Linking 
} from 'react-native'
import DropdownMenu from '../components/DropdownMenu'
import HomeHeader from '../components/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { changeCurrency, changeInitialScreen } from '../store/slices/settingsSlice'
import colors from '../constants/colors'
import MenuOption from '../components/MenuOption'
import { MainScreenProps } from '../types/Navigation'
import InAppReview from 'react-native-in-app-review'

const Settings = ({ navigation } : { navigation: MainScreenProps<'Settings'>['navigation'] }) => {
  const dispatch = useAppDispatch()
  const currency = useAppSelector((state) => state.settings.currency)
  const initialScreen = useAppSelector((state) => state.settings.initialScreen)

  return (
    <SafeAreaView style={styles.background}>
      <HomeHeader />
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View style={styles.dropdownContainer}>
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
        <View style={styles.aboutContainer}>
          <Text style={styles.headingText}>About</Text>
          <MenuOption option='Contact us' onPress={() => Linking.openURL('mailto: bitcloveruk@gmail.com')}/>
          <MenuOption option='Privacy policy' onPress={() => navigation.navigate('Privacy')} />
          <MenuOption option='Terms of use' onPress={() => navigation.navigate('Terms')} />
          <MenuOption option='Rate BitClover' onPress={() => InAppReview.RequestInAppReview()}/>
        </View>
        <View style={{ flex : 1}}>
          <Text style={styles.versionText}>
            BitClover v1.0.0
          </Text>
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
    fontSize: 18,
    paddingBottom: 10,
    fontWeight: '500'
  },
  aboutContainer: {
    backgroundColor: colors.backgroundSecondary,
    marginVertical: 20,
    borderRadius: 10,
    padding: 10,
    flex: 1
  },
  dropdownContainer: {
    backgroundColor: colors.backgroundSecondary,
    padding: 10,
    borderRadius: 10,
    flex: 1
  },
  versionText: {
    color: colors.text, 
    fontSize: 15, 
    fontWeight: '500', 
    paddingLeft: 7.5
  }
})

export default Settings