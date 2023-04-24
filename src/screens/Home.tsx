import React, { useState, useEffect} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import HomeHeader from '../components/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import appClient from '../clients/AppClient'
import { CoinData, SortedData } from '../types/Home'
import HomeCoinInfoCard from '../components/HomeCoinInfoCard'
import { useAppSelector } from '../hooks/redux'
import colors from '../constants/colors'

const Home = () => {
  const [data, setData] = useState<SortedData>()
  const [error, setError] = useState<boolean>(false)
  const currency = useAppSelector((state) => state.settings.currency)
  
  useEffect(() => {
    const getData = async () => {
      try {
        const json = await appClient.getAllCoinPrices(currency)
        console.log(json)
        setData(sortData(json))
      } catch (error) {
        throw new Error('Error loading data')
        setError(true)
      }
    }
    getData()
  }, [currency])

  const sortData = (data: CoinData[]): SortedData => {
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

  return (
    <SafeAreaView style={styles.background}>
      <HomeHeader />
      <View style={{ flex: 1, justifyContent: 'space-evenly', paddingHorizontal: 10 }}>
        <View style={styles.flatlistContainer}>
          <Text style={styles.headingText}>Most Popular</Text>
          <FlatList 
            data={data?.popular}
            renderItem={({ item }) => <HomeCoinInfoCard coinInfo={item} />}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
        <View style={styles.flatlistContainer}>
          <Text style={styles.headingText}>Highest Gainers</Text>
          <FlatList 
            data={data?.gain}
            renderItem={({ item }) => <HomeCoinInfoCard coinInfo={item} />}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
        <View style={styles.flatlistContainer}>
          <Text style={styles.headingText}>Biggest Losers</Text>
          <FlatList
            data={data?.loss}
            renderItem={({ item }) => <HomeCoinInfoCard coinInfo={item} />}
            keyExtractor={item => item.id}
            horizontal
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#152121',
    flex: 1
  },
  flatlistContainer: {
    borderRadius: 10,
    backgroundColor: colors.backgroundSecondary, 
    padding: 10,
    height: 200
  },
  headingText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: 'bold',
    padding: 5
  }
})

export default Home