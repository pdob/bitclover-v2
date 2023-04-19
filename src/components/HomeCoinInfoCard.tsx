import { CoinData } from '../types/Home'
import React from 'react'
import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import colors from '../constants/colors'
import { useAppSelector } from '../hooks/redux'
import { getCurrencySymbol } from '../functions/utils'

const HomeCoinInfoCard = ({coinInfo}: {coinInfo: CoinData}) => {
  const currency = useAppSelector((state) => state.settings.currency)
  const priceChangePositive = coinInfo.price_change_24h > 0
  const currencySymbol = getCurrencySymbol(currency)
  return (
    <Pressable style={styles.horizontalFlatListContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: coinInfo.image }} />
        <Text style={styles.horizontalFlatListTitle} numberOfLines={2}>
          {coinInfo.name}
        </Text>
      </View>
      <View>
        <Text style={styles.horizontalFlatListText} numberOfLines={1} adjustsFontSizeToFit>
          {currencySymbol}{coinInfo.current_price.toFixed(2)} 
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image 
            style={{ height: 10, width: 10 }}
            source={
              priceChangePositive ? require('../assets/price-arrow-up.png') : require('../assets/price-arrow-down.png')
            } 
          />
          <Text
            adjustsFontSizeToFit
            style={[styles.priceText, {color: coinInfo.price_change_24h > 0 ? 'green' : 'red'}]}
          >
            {` ${currencySymbol}${coinInfo.price_change_24h.toFixed(2)}`}  
          </Text>
        </View>
        <View>
          <Text
            adjustsFontSizeToFit
            style={[styles.priceText, {color: coinInfo.price_change_24h > 0 ? 'green' : 'red'}]}
          >
            ({coinInfo.price_change_24h > 0 ? '+' : ''}
            {coinInfo.price_change_percentage_24h.toFixed(3)}%)
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 21,
    width: 21,
    marginRight: 4,
  },
  imageContainer: {
    flexDirection: 'row',
    marginRight: 5,
    height: '35%',
  },
  horizontalFlatListTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 3,
    flex: 1,
    paddingBottom: 10
  },
  horizontalFlatListContainer: {
    backgroundColor: colors.backgroundTernary,
    borderRadius: 15,
    height: 130,
    margin: 9,
    overflow: 'hidden',
    padding: 10,
    width: 130,
    elevation: 20,
  },
  horizontalFlatListText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 7,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500'
  }
})


export default HomeCoinInfoCard