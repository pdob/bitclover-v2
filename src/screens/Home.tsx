import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ScrollView 
} from 'react-native'
import HomeHeader from '../components/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import appClient from '../clients/AppClient'
import { CoinData, SortedData } from '../types/Home'
import HomeCoinInfoCard from '../components/HomeCoinInfoCard'
import { useAppSelector } from '../hooks/redux'
import colors from '../constants/colors'
import { handleError } from '../functions/utils'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { AxiosError } from 'axios'

export const sortData = (data: CoinData[]): SortedData => {
  const popular = data.slice(0, 20)
  
  const sortedByGain = data.slice().sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
  const gain = sortedByGain.slice(0, 20)
  
  const sortedByLoss = data.slice().sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
  const loss = sortedByLoss.slice(0, 20)
  
  return {
    popular,
    gain,
    loss
  }
}

const Home = () => {
  const [data, setData] = useState<SortedData>()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const currency = useAppSelector((state) => state.settings.currency)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const json = await appClient.getAllCoinPrices(currency)        
        setData(sortData(json))
        setLoading(false)
      } catch (error) {     
        setError(handleError({ error: error as AxiosError}))
        setLoading(false)
      }
    }
    getData()
  }, [currency])

  return (
    <SafeAreaView style={styles.background}>
      {error ? <Error error={error} /> : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <HomeHeader />
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={styles.flatlistContainer}>
              <Text style={styles.headingText}>Most Popular</Text>
              {loading ? <Loader /> : (
                <FlatList 
                  data={data?.popular}
                  renderItem={({ item }) => <HomeCoinInfoCard coinInfo={item} />}
                  keyExtractor={item => item.id}
                  horizontal
                />
              )}
            </View>
            <View style={styles.flatlistContainer}>
              <Text style={styles.headingText}>Highest Gainers</Text>
              {loading ? <Loader /> : (
                <FlatList 
                  data={data?.gain}
                  renderItem={({ item }) => <HomeCoinInfoCard coinInfo={item} />}
                  keyExtractor={item => item.id}
                  horizontal
                />
              )}
            </View>
            <View style={styles.flatlistContainer}>
              <Text style={styles.headingText}>Biggest Losers</Text>
              {loading ? <Loader /> : (
                <FlatList
                  data={data?.loss}
                  renderItem={({ item }) => <HomeCoinInfoCard coinInfo={item} />}
                  keyExtractor={item => item.id}
                  horizontal
                />
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1
  },
  flatlistContainer: {
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary, 
    padding: 10,
    height: 200,
    marginVertical: 10
  },
  headingText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5
  }
})

export default Home