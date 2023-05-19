import React from 'react'
import { 
  Pressable, 
  View, 
  Text, 
  Image, 
  StyleSheet
} from 'react-native'
import  { useNavigation } from '@react-navigation/core'
import { formatCurrency } from '../functions/utils'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import colors from '../constants/colors'
import icons from '../constants/icons'
import { ApplicationScreenProps } from '../types/Navigation'
import { addFavourite, MarketListItemProps, removeFavourite } from '../store/slices/favouritesSlice'

const MarketListItem = (item: MarketListItemProps) => {
  const navigation = useNavigation<ApplicationScreenProps<'CoinInfo'>['navigation']>()
  const dispatch = useAppDispatch()
  
  const currency = useAppSelector((state) => state.settings.currency)
  const favourites = useAppSelector((state) => state.favourites.ids)
  
  const handleFavourites = (id: string) => {
    if (favourites?.includes(id)) {   
      dispatch(removeFavourite(id))
    } else {
      dispatch(addFavourite(id))
    }
  }

  return (
    <Pressable
      style={styles.flatlistItem}
      onPress={() =>
        navigation.navigate('CoinInfo', {
          coinId: item.id,
          coinName: item.name,
          coinImage: item.image,
        })
      }>
      <View style={styles.titleContainer}>
        <Text style={styles.rankText}>{item.rank}.</Text>
        <Image source={{uri: item.image}} style={styles.flatlistImage} />
        <Text style={styles.flatlistTitle} numberOfLines={3}>
          {item.name}
          {'\n'}
          <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
        </Text>
      </View>
      <View style={styles.percentageContainer}>
        <Image
          style={styles.priceIcon}
          source={
            item.percentage > 0
              ? require('../assets/price-arrow-up.png')
              : require('../assets/price-arrow-down.png')
          }
        />
        <Text
          style={[
            styles.priceText,
            {color: item.percentage > 0 ? 'green' : 'red'},
          ]}
        >
          {item.percentage?.toFixed(2)}%
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          style={[
            styles.priceText,
            {color: item.percentage > 0 ? 'green' : 'red'},
          ]}>
          {formatCurrency(item.price, currency)}
        </Text> 
      </View>
      <Pressable 
        style={styles.favContainer}
        onPress={() => handleFavourites(item.id)}
      >
        <Image 
          source={favourites?.includes(item.id) ? icons.favSelected : icons.fav} 
          style={styles.favIcon}
        />
      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  flatlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 75,
    overflow: 'hidden',
    backgroundColor: colors.backgroundSecondary
  },
  flatlistImage: {
    height: 25,
    width: 25,
  },
  flatlistTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    paddingLeft: 10,
    flex: 1,
  },
  percentageContainer: {
    width: '30%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  priceContainer: {
    width: '20%'
  },
  priceIcon: {
    height: 12.5,
    width: 12.5,
    marginRight: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '700',
  },
  rankText: {
    color: '#b6bab8',
    fontSize: 14,
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 10,
  },
  symbol: {
    color: '#b6bab8',
    fontWeight: '700',
    fontSize: 13,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  favContainer: {
    width: '10%',
    padding: 7.5
  },
  favIcon: {
    height: 22.5,
    width: 22.5
  }
})

export default MarketListItem
