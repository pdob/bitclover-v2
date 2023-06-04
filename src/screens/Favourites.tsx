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
import { useQuery } from '@tanstack/react-query'

const Favourites = () => {
  const favourites = useAppSelector((state) => state.favourites.ids)
  const currency = useAppSelector((state) => state.settings.currency)
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['favourites', favourites, currency],
    queryFn: async () => await appClient.fetchFavourites(favourites, currency),
    retryDelay: 10000,
    retry: 2
  })
  
  useEffect(() => {
    if (error) {
      setErrorMessage(handleError({ error: error as AxiosError}))
    }
  }, [error])

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
      {isLoading ? <Loader /> : isError ? <Error error={errorMessage} /> : (
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