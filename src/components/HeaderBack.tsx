import React from 'react'
import { View, Pressable, Image, StyleSheet, Text } from 'react-native'
import colors from '../constants/colors'
import icons from '../constants/icons'
import { useNavigation } from '@react-navigation/native'

const HeaderBack = ({ 
  image, 
  name }: {
  image?: string
  name?: string
}) => {

  const navigation = useNavigation()
  return (
    <View style={styles.header}>
      <Pressable onPress={() => navigation.goBack()}>
        <View style={{flexDirection: 'row', alignContent: 'flex-start', padding: 10 }}>
          <Image 
            source={icons.back}
            style={styles.headerBack}
          />
        </View>
      </Pressable> 
      <Image 
        source ={{uri: image}}
        style={styles.headerLogo}  
      />
      <Text style={styles.headerTitle}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPrimary,
    flexDirection: 'row',
    height: 50,
    paddingBottom: 10
  },
  headerBack: {
    height: 20,
    width: 20
  },
  headerLogo: {
    height: 20,
    marginRight: 6 ,
    width: 20
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
})

export default HeaderBack