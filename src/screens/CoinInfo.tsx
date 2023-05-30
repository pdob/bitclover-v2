import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { 
  View, 
  Text,
  StyleSheet, 
  Image, 
  ScrollView 
} from 'react-native'
import appClient from '../clients/AppClient'
import colors from '../constants/colors'
import Button from '../components/Button'
import icons from '../constants/icons'
import Separator from '../components/Separator'
import { useAppSelector } from '../hooks/redux'
import { LineGraph } from 'react-native-graph'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { 
  formatCurrency, 
  calculatePercentageChange, 
  getPercentageForTimePeriod, 
  formatLargeNumbers, 
  getCurrencySymbol,
  handleError, 
  JsError
} from '../functions/utils'
import Loader from '../components/Loader'
import { SupportedCurrencies } from '../types/Home'
import { ChartData, CurrencyObject, CoinData } from '../types/CoinInfo'
import { ImageSourcePropType } from 'react-native'
import { AppStackScreenProps } from '../types/Navigation'
import SelectTimePeriod from '../components/SelectTimePeriod'
import Error from '../components/Error'

export const timePeriods = [1, 7, 30, 60, 365, 'max']
export type TimePeriod = 1 | 7 | 30 | 60 | 365 | 'max'

const CoinStat = ({
  icon, 
  title, 
  value
} : {
  icon: ImageSourcePropType
  title: string
  value: string | number
}) => (
  <View style={styles.coinStat}>
    <View style={styles.coinStatContainer}>
      <Image source={icon} style={styles.coinStatImage} />
      <Text style={styles.coinStatText}>{title}</Text>
    </View>
    <Text style={styles.coinStatText}>{value}</Text>
  </View>
)

const CoinInformation = ({
  coinData, 
  currency,
  currencySymbol
} : {
  coinData: CoinData
  currency: SupportedCurrencies
  currencySymbol: string
}) => (
  <View style={styles.statContainer}>
    <CoinStat
      title="Market rank"
      value={coinData.market_cap_rank}
      icon={icons.marketRank}
    />
    <Separator />
    <CoinStat
      title="Market cap"
      value={`${currencySymbol}${formatLargeNumbers(coinData.market_cap[currency as keyof CurrencyObject])}`}
      icon={icons.marketCap}
    />
    <Separator />
    <CoinStat
      title="Circulating supply"
      value={formatLargeNumbers(coinData.circulating_supply)}
      icon={icons.circulatingSupply}
    />
    <Separator />
    <CoinStat
      title="Total supply"
      value={formatLargeNumbers(coinData.total_supply)}
      icon={icons.totalSupply}
    />
    <Separator />
    <CoinStat
      title="All time high"
      value={formatCurrency(coinData.ath[currency as keyof CurrencyObject], currency)}
      icon={icons.ath}
    />
    <Separator />
    <CoinStat
      title="ATH date"
      value={new Date(coinData.ath_date[currency as keyof CurrencyObject]).toUTCString().slice(0, 16)}
      icon={icons.athDate}
    />
  </View>
)

const CoinInfo = ({
  navigation, 
  route
} : 
  AppStackScreenProps<'CoinInfo'>
) => {
  const [data, setData] = useState<CoinData>()
  const [chartData, setChartData] = useState<ChartData>([])
  const [loading, setLoading] = useState(true)
  const [gestureActive, setGestureActive] = useState<boolean>(false)
  const [price, setPrice] = useState<number>(0)
  const [chartDate, setChartDate] = useState<string>(Date.now().toLocaleString())
  const [currentPrice, setCurrentPrice] = useState<number>(0)
  const [percentageChange, setPercentageChange] = useState<number>(0)
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(1)
  const [error, setError] = useState<string>('')

  const { coinId, coinName, coinImage } = route.params
  const currency = useAppSelector((state) => state.settings.currency)

  const gradientsPositive: string[] = ['#1ab422','#1ab422', '#000000']
  const gradientsNegative: string[] = ['#d30000','#ed2939', '#000000']

  const percentagePositive: boolean = percentageChange > 0

  const resetLabels = () => {
    setPrice(currentPrice)
    setChartDate(new Date(Date.now()).toUTCString())
    setPercentageChange(getPercentageForTimePeriod(data, timePeriod))
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const a = await appClient.getCoinInfo(coinId)
        const b = await appClient.getCoinChartData(coinId, currency, timePeriod) 
        if ('status' in a) {
          setError(handleError({error: a }))
          setLoading(false)
        } else if ('status' in b) {
          setError(handleError({error: b }))
          setLoading(false)
        } else {
          setData(a.market_data)
          setChartData(b.prices.map((item: ChartData) => {
            return {
              date: new Date(item[0]),
              value: item[1],
            }
          }))
          setCurrentPrice(a.market_data.current_price?.[currency.toLowerCase()] || 0)
          setPrice(currentPrice)
          if (data && chartData?.length) {
            setPercentageChange(getPercentageForTimePeriod(data, timePeriod))
            setLoading(false)
          }
        }
      } catch (error) {
        handleError({ error: error as JsError })
        setLoading(false)
      }
    }
    getData()
  }, [coinId, chartData?.length, timePeriod])

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <Loader /> : error ? <Error error={error} /> : (
        <ScrollView>
          <View style={styles.headingContainer}>
            <View style={styles.titleContainer}>
              <Image style={styles.image} source={{uri: coinImage }} />
              <Text style={styles.coinTitle}>{coinName}</Text>
            </View>
            <Text style={styles.coinPrice}>{formatCurrency(price, currency)}</Text>
            <Text style={styles.date}>{chartDate}</Text>
            <View style={styles.titleContainer}>
              <Image 
                style={styles.image}
                source={
                  percentagePositive ? require('../assets/price-arrow-up.png') : require('../assets/price-arrow-down.png')
                } 
              />
              <Text 
                style={[styles.coinTitle, {color: percentagePositive ? colors.green : colors.red}]}
              >
                {percentageChange}%
              </Text>
            </View>
          </View>
          <View style={styles.chartContainer}>        
            <LineGraph
              style={styles.graph}
              points={chartData}
              animated={true}
              color={percentagePositive ? colors.green : colors.red}
              enablePanGesture={true}
              onGestureStart={() => {
                setGestureActive(true)
                ReactNativeHapticFeedback.trigger('impactLight')
              }}
              onPointSelected={(p) => {
                if (gestureActive) {
                  setPrice(p.value)
                  setChartDate(p.date.toUTCString())
                  setPercentageChange(calculatePercentageChange(currentPrice, price))
                }
              }}
              onGestureEnd={() => {
                setGestureActive(false)
                setTimeout(() => resetLabels(), 10)
              }}
              panGestureDelay={100}
              gradientFillColors={percentagePositive ? gradientsPositive : gradientsNegative}
            />
          </View>

          <SelectTimePeriod onPress={setTimePeriod} buttons={timePeriods}/>

          <View style={{ flex: 1 }}>
            <CoinInformation
              coinData={data} 
              currency={currency.toLowerCase() as SupportedCurrencies}
              currencySymbol={getCurrencySymbol(currency)} 
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button buttonText='Back' onPress={() => navigation.goBack()} />
          </View>
        </ScrollView>
      ) }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary
  },
  chartContainer: { 
    height: 300, 
    flex: 1,
    width: '100%'
  },
  coinStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  coinStatContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  coinStatImage: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  coinStatText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  coinStatTitle: {
    padding: 10,
    color: colors.text,
    fontSize: 20,
    fontWeight: '500',
  },
  coinTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500'
  },
  coinPrice: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.text
  },
  date: {
    fontSize: 14,
    fontWeight: '600', 
    fontStyle: 'italic',
    color: colors.text
  },
  statContainer: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.backgroundSecondary,
    margin: 15,
    top: -15
  },
  image: {
    height: 15,
    width: 15,
    marginRight: 3
  },
  headingContainer: {
    flex: 1, 
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  titleContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  graph: { 
    height: 200, 
    width: '100%', 
    flex: 1, 
    opacity: 0.5 
  },
  buttonContainer: {
    flex: 1, 
    justifyContent: 'flex-end', 
    alignItems: 'center',
    paddingBottom: 10
  }
})

export default CoinInfo