import React, { useEffect, useState } from 'react'
import { 
  View, 
  Text, 
  Pressable, 
  Image, 
  StyleSheet, 
  Linking 
} from 'react-native' 
import { useAppSelector } from '../hooks/redux'
import { FlashList } from '@shopify/flash-list'
import appClient from '../clients/AppClient'
import { formatLargeNumbers, handleError } from '../functions/utils'
import colors from '../constants/colors'
import Separator from '../components/Separator'
import { SafeAreaView } from 'react-native-safe-area-context'
import Error from '../components/Error'
import Loader from '../components/Loader'
import { SupportedCurrencies } from '../types/Home'

export type ExchangeItem = {
  id: string
  year_established: string
  country: string
  description: string
  has_trading_incentive: boolean
  image: string
  trust_score: number
  trust_score_rank: number
  trade_volume_24h_btc: number
  trade_volume_24h_btc_normalized: number
  name: string
  url: string
}

const ExchangeListItem = ({
  title, 
  image, 
  rank, 
  volume,
  url, 
  country,
  btcPrice,
  currency
} : {
  title: string
  image: string
  rank: number
  volume: number
  url: string
  country: string
  btcPrice: number,
  currency: SupportedCurrencies
}) => (
  <View style={styles.flatlistContainer}>
    <Pressable
      style={styles.flatlistItem}
      onPress={() => Linking.openURL(url)}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: image
          }}
        />
        <Text style={styles.statsText}>
          {rank}. {title}
          {'\n'}
          <Text style={styles.flatlistSubheading}>{country}</Text>
        </Text>
      </View>
      <View style={styles.stats}>
        <Text style={styles.flatlistText}>
            24h volume: {'\n'}
          <Text style={styles.flatlistSubheading} adjustsFontSizeToFit >
            BTC: {volume.toFixed(2)}
            {'\n'}
            {`${currency}: ${formatLargeNumbers(volume * btcPrice)}`}
          </Text>
        </Text>
      </View>
    </Pressable>
  </View>
)


const Exchanges = () => {

  const [data, setData] = useState<ExchangeItem[]>([])
  const [error, setError] = useState<string>('')
  const [btcPrice, setBtcPrice] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  
  const currency = useAppSelector((state) => state.settings.currency)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const json = await appClient.getAllExchanges()
        const priceJson = await appClient.getCoinPrice('bitcoin')
        if (json.status){
          setError(handleError(json.status.error_message))
        } else {
          setData(json)
          setBtcPrice(priceJson.bitcoin[currency.toLowerCase()])
        }
        setLoading(false)
      } catch (error) {
        setError(handleError(error.message))
        setLoading(false)
      }}
    getData()
  }, [])

  const renderExchangeItem = ({ item }: { item: ExchangeItem }) => (
    <ExchangeListItem
      country={item.country}
      image={item.image}
      rank={item.trust_score_rank}
      volume={item.trade_volume_24h_btc}
      title={item.name}
      url={item.url}
      btcPrice={btcPrice}
      currency={currency}
    />
  )
  
  return (
    <SafeAreaView style={styles.container}>
      {loading ? <Loader /> : error ? <Error error={error} /> : (
        <FlashList 
          data={data}
          renderItem={renderExchangeItem}
          estimatedItemSize={80}
          ItemSeparatorComponent={Separator}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  flatlistContainer: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary
  },
  flatlistItem: {
    alignItems: 'center',
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  flatlistText: {
    color: colors.textDarker,
    fontSize: 13,
    fontWeight: '500'
  },
  flatlistSubheading: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600'
  },
  image: {
    height: 25,
    width: 25,
    marginRight: 10,
    marginTop: 5,
    marginLeft: 10
  },
  imageContainer: {
    width: '50%',
    flexDirection: 'row',
  },
  stats: {
    width: '35%',
    justifyContent: 'flex-end'
  },
  statsText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700'
  },
})


export default Exchanges