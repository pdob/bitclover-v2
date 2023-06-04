import React, { 
  useEffect, 
  useState,
  useCallback 
} from 'react'
import { View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import colors from '../constants/colors'
import { useAppSelector } from '../hooks/redux'
import MarketListItem from '../components/MarketListItem'
import appClient from '../clients/AppClient'
import { CoinData } from '../types/Home'
import Error from '../components/Error'
import ListEmpty from '../components/ListEmpty'
import { handleError } from '../functions/utils'
import Loader from '../components/Loader'
import { AxiosError } from 'axios'

const Favourites = () => {
  const favourites = useAppSelector((state) => state.favourites.ids)
  const currency = useAppSelector((state) => state.settings.currency)
  const [data, setData] = useState<CoinData[]>()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getData = async () => {
      try {
        if (favourites.length) {
          setLoading(true)
        }
        const json = await appClient.fetchFavourites(favourites, currency)    
        setData(json)
        setLoading(false)      
      } catch (error) {     
        setError(handleError({ error: error as AxiosError }))
        setLoading(false)
      }
    }
    getData()
  }, [favourites, currency])

  const renderItem = useCallback(
    ({ item } : {item: CoinData}) => {
      return (
        <MarketListItem
          id={item.id}
          image={item.image}
          name={item.name}
          price={item.current_price}
          rank={item.market_cap_rank}
          percentage={item.price_change_percentage_24h}
          symbol={item.symbol}
        />
      )
    }, [])
  
  return (
    <View style={{ backgroundColor: colors.backgroundPrimary, flex: 1}}>
      {loading ? <Loader /> : error ? <Error error={error} /> : (
        <>
          <FlashList
            estimatedItemSize={75}
            extraData={favourites}
            data={data}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ backgroundColor: colors.separator, height: 0.5 }} />}
            ListEmptyComponent={() => <ListEmpty message="Add some items to your favourites to see them here!"/>} />
        </>
      )}
    </View>
  )
}

export default Favourites