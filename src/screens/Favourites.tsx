import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import colors from '../constants/colors'
import { useAppSelector } from '../hooks/redux'
import { renderMarketItem } from './Markets'
import appClient from '../clients/AppClient'
import { CoinData } from '../types/Home'
import Error from '../components/Error'

const FavEmpty = () => (
  <View style={{ flex: 1 }}>
    <Text style={{ color: colors.text }}>
      Add some items to your favourites to see them here!
    </Text>
  </View>
)

const Favourites = () => {
  const favourites = useAppSelector((state) => state.favourites.ids)
  const currency = useAppSelector((state) => state.settings.currency)
  const [data, setData] = useState<CoinData[]>()
  const [error, setError] = useState()

  useEffect(() => {
    const getData = async () => {
      try {
        const json = await appClient.fetchFavourites(favourites, currency)
        setData(json)
      } catch (error) {
        setError(error)
      }
    }
    if (data?.status) {
      setError(data?.status?.error_message)
    }
    getData()
  }, [favourites, currency])

  console.log(data?.status)
  
  return (
    <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1}}>
      {error ? <Error error={error} /> : (
        <>
          <FlashList
            estimatedItemSize={75}
            extraData={favourites}
            data={data}
            renderItem={renderMarketItem}
            ItemSeparatorComponent={() => <View style={{ backgroundColor: colors.separator, height: 0.5 }} />}
            ListEmptyComponent={() => <FavEmpty />} />
        </>
      )}
    </View>
  )
}

export default Favourites