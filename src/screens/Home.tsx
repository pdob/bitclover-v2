import React, { useState, useEffect} from 'react'
import { View, Text, FlatList } from 'react-native'
import HomeHeader from '../components/HomeHeader'
import { SafeAreaView } from 'react-native-safe-area-context'
import appClient from '../clients/AppClient'
import { CoinData } from '../types/Home'
import HomeCoinInfo from '../components/HomeCoinInfo'
import { useAppSelector } from '../hooks/redux'

const Home = () => {
  const [data, setData] = useState<CoinData[]>([])
  const [error, setError] = useState<boolean>(false)
  const currency = useAppSelector((state) => state.settings.currency)

  useEffect(() => {
    const getData = async () => {
      try {
        const ble = await appClient.getAllCoinPrices()
        setData(ble)
      } catch (error) {
        console.log(error)
        setError(true)
      }
    }
    getData()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeHeader />
      <Text>
        Pasiu wielki kutasiu
      </Text>
      <View style={{ flex: 1 }}>
        <FlatList 
          data={data}
          renderItem={({ item }) => <HomeCoinInfo coinInfo={item} />}
          keyExtractor={item => item.id}
          horizontal
        />
      </View>
    </SafeAreaView>
  )
}

export default Home