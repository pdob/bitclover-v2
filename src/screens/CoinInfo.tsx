import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import appClient from '../clients/AppClient'
import colors from '../constants/colors'
import Button from '../components/Button'
import icons from '../constants/icons'
import Separator from '../components/Separator'
import Graph from '../components/Graph'
import { useAppSelector } from '../hooks/redux'

const CoinStat = ({icon, title, value}) => (
  <View style={styles.coinStat}>
    <View style={styles.coinStatContainer}>
      <Image source={icon} style={styles.coinStatImage} />
      <Text style={styles.coinStatText}>{title}</Text>
    </View>
    <Text style={styles.coinStatText}>{value}</Text>
  </View>
)

const CoinInformation = (coindata) => (
  <View>

    <View>
      <Text style={styles.coinStatTitle}>About</Text>
    </View>
    <View style={styles.statContainer}>
      <CoinStat
        title="Market rank"
        value={''}
        icon={icons.marketRank}
      />
      <Separator />
      <CoinStat
        title="Market cap"
        value={''}
        icon={icons.marketCap}
      />
      <Separator />
      <CoinStat
        title="Circulating supply"
        value={''}
        icon={icons.circulatingSupply}
      />
      <Separator />
      <CoinStat
        title="Total supply"
        value={''}
        icon={icons.totalSupply}
      />
      <Separator />
      <CoinStat
        title="All time high"
        value={''}
        icon={icons.ath}
      />
      <Separator />
      <CoinStat
        title="ATH date"
        value={''}
        icon={icons.athDate}
      />
    </View>
  </View>
)

const CoinInfo = ({navigation, route} : {navigation: any, route: any}) => {

  const [data, setData] = useState<any>()
  const [chartData, setChartData] = useState<any>()
  const [loading, setLoading] = useState(true)
  const { coinId } = route.params
  const currency = useAppSelector((state) => state.settings.currency)

  const chartDataToShow = chartData?.map(item => {
    return {
      timestamp: item[0],
      value: item[1],
    }
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const a = await appClient.getCoinInfo(coinId)
        const b = await appClient.getCoinChartData(coinId, currency, 30)
        setData(a.market_data)
        setChartData(b.prices)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [coinId])


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundPrimary }}>
      {loading ? <View /> : (
        <><View>
          <Graph data={chartDataToShow} />
        </View><View style={{ flex: 1 }}>
          <CoinInformation />
        </View><View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button buttonText='Back' onPress={() => navigation.goBack()} />
        </View></>
      ) }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#102027',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  chartLabelContainer: {
    justifyContent: 'center',
    height: 50,
    paddingLeft: 10,
    alignItems: 'center',
  },
  chartDateTime: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  chartPrice: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
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
  },
  coinStatImage: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  coinStatText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  coinStatTitle: {
    padding: 10,
    color: colors.text,
    fontSize: 20,
    fontWeight: '500',
  },
  statContainer: {
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: colors.backgroundSecondary,
  }
})

export default CoinInfo