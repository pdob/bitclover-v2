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
import { JsError } from '../functions/utils'

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
        if ('status' in json) {
          setError(handleError({ error: json }))
          setLoading(false)
        } else {
          setData(json)
          setLoading(false)
        }
      } catch (error) {     
        setError(handleError({ error: error as JsError }))
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