import React, { useState, useEffect, FC } from 'react'
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
import { useQuery } from '@tanstack/react-query'
import { MainScreenProps } from '../types/navigation'

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

const Home: FC<MainScreenProps<'Home'>> = () => {
  const [sortedData, setSortedData] = useState<SortedData>()
  const [errorMsg, setErrorMsg] = useState<string>('')
  const currency = useAppSelector((state) => state.settings.currency)

  const { data , error, isLoading, isFetching } = useQuery({
    queryKey: ['home', currency, 200],
    queryFn: async () => await appClient.getAllCoinPrices(currency, 200),
    refetchInterval: 120000,
    retry: 4,
    retryDelay: 30000,
    staleTime: Infinity
  })

  useEffect(() => {
    if (error) {
      setErrorMsg(handleError({ error: error as AxiosError}))
    }
    if (data) {
      setSortedData(sortData(data))
    }
  }, [error, data, isFetching])
  
  return (
    <SafeAreaView style={styles.background}>
      {error ? <Error error={errorMsg} /> : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <HomeHeader />
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <View style={styles.flatlistContainer}>
              <Text style={styles.headingText}>Most Popular</Text>
              {isLoading ? <Loader /> : (
                <FlatList 
                  data={sortedData?.popular}
                  renderItem={({ item }) => <HomeCoinInfoCard coinInfo={item} />}
                  keyExtractor={item => item.id}
                  horizontal
                />
              )}
            </View>
            <View style={styles.flatlistContainer}>
              <Text style={styles.headingText}>Highest Gainers</Text>
              {isLoading ? <Loader /> : (
                <FlatList 
                  data={sortedData?.gain}
                  renderItem={({ item }) => <HomeCoinInfoCard coinInfo={item} />}
                  keyExtractor={item => item.id}
                  horizontal
                />
              )}
            </View>
            <View style={styles.flatlistContainer}>
              <Text style={styles.headingText}>Biggest Losers</Text>
              {isLoading ? <Loader /> : (
                <FlatList
                  data={sortedData?.loss}
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