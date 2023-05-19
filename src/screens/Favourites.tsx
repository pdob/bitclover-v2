import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import colors from '../constants/colors'
import { useAppSelector } from '../hooks/redux'
import { renderMarketItem } from './Markets'
import appClient from '../clients/AppClient'
import { CoinData } from '../types/Home'
import Error from '../components/Error'
import ListEmpty from '../components/ListEmpty'
import { handleError } from '../functions/utils'
import Loader from '../components/Loader'

const Favourites = () => {
  const favourites = useAppSelector((state) => state.favourites.ids)
  const currency = useAppSelector((state) => state.settings.currency)
  const [data, setData] = useState<CoinData[]>()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const json = await appClient.fetchFavourites(favourites, currency)
        if(json.status) {
          setError(handleError(json.status.error_message))
        } else {
          setData(json)
        }
        setLoading(false)
      } catch (error) {
        setError(handleError(error.message))
        setLoading(false)
      }
    }
    getData()
  }, [favourites, currency])
  
  return (
    <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1}}>
      {loading ? <Loader /> : error ? <Error error={error} /> : (
        <>
          <FlashList
            estimatedItemSize={75}
            extraData={favourites}
            data={data}
            renderItem={renderMarketItem}
            ItemSeparatorComponent={() => <View style={{ backgroundColor: colors.separator, height: 0.5 }} />}
            ListEmptyComponent={() => <ListEmpty message="Add some items to your favourites to see them here!"/>} />
        </>
      )}
    </View>
  )
}

export default Favourites