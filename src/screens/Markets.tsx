import React, { useState, useEffect} from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable, Image } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../constants/colors'
import { useAppSelector } from '../hooks/redux'
import appClient from '../clients/AppClient'
import { CoinData } from '../types/Home'
import MarketListItem from '../components/MarketListItem'
import { handleError } from '../functions/utils'
import Error from '../components/Error'

export const renderMarketItem = ({item} : {item: CoinData}) => {
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
  )}

const Markets = () => {

  const [data, setData] = useState<CoinData[]>([])
  const [filteredData, setFilteredData] = useState<CoinData[]>([])
  const [sortedData, setSortedData] = useState<CoinData[]>([])
  const [query, setQuery] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [sortOrder, setSortOrder] = useState('asc')
  const [sortProperty, setSortProperty] = useState('market_cap_rank')


  const handlePress = (property: string) => {
    let newSortOrder = 'asc'
    if (property === sortProperty) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    }
    setSortOrder(newSortOrder)
    setSortProperty(property)
  }

  const sortBy = (property: string, order: string) => {
    return (a: CoinData, b: CoinData) => {
      const aValue = a[property as keyof CoinData]
      const bValue = b[property as keyof CoinData]
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    }
  }

  const currency = useAppSelector((state) => state.settings.currency)

  useEffect(() => {
    const getData = async () => {
      try {
        const json = await appClient.getAllCoinPrices(currency, 500)
        if(json.status) {
          setError(handleError(json.status))
        }
        setData(json)
        setFilteredData(json)
      } catch (error) {
        setError(handleError(error))
      }
    }
    getData()
  }, [currency])

  useEffect(() => {
    setSortedData(filteredData.slice().sort(sortBy(sortProperty, sortOrder)))
  }, [sortProperty, sortOrder, filteredData])

  const handleSearch = (query: string) => {
    setQuery(query)
    const newData = data.filter((item) => 
      item.name.toLowerCase().includes(query.toLowerCase()) 
      || item.symbol.toLowerCase().includes(query.toLowerCase()))
    setFilteredData(newData)
  }

  const Header = () => (
    <View style={styles.header}>
      <Pressable 
        style={styles.headerSearch}
      >
        <Image 
          source={require('../assets/icons/search.png')}
          style={{height: 22.5, width: 22.5}}
        />
      </Pressable>
      <Pressable
        style={styles.headerName}
        onPress={() => handlePress('market_cap_rank')}
      >
        <Text style={styles.headerText}>Name</Text>
      </Pressable>
      <Pressable
        style={styles.headerHours}
        onPress={() => handlePress('price_change_percentage_24h')}
      >
        <Text style={styles.headerText}>24h</Text>
      </Pressable>
      <Pressable
        style={styles.headerPrice}
        onPress={() => handlePress('current_price')}
      >
        <Text style={styles.headerText}>Price</Text>
      </Pressable>
    </View>
  )
  
  return (
    <SafeAreaView style={styles.container}>
      {error ? <Error error={error} /> : (
        <>
          <View>
            <Header />
          </View>
          <View style={{ flex: 1 }}>
            <FlashList
              estimatedItemSize={75}
              data={query ? filteredData : sortedData}
              renderItem={renderMarketItem}
              ItemSeparatorComponent={() => <View style={{ backgroundColor: colors.separator, height: 0.5 }} />}
              extraData={sortOrder} />
          </View>
        </>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary
  },
  header: {
    height: 50,
    backgroundColor: colors.backgroundPrimary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerHours: {
    width: '30%'
  },
  headerName: {
    width: '30%',
    paddingLeft: 20
  },
  headerPrice: {
    width: '30%'
  },
  headerSearch: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },  
  headerText: {
    color: '#b6bab8',
    fontSize: 15,
    fontWeight: '700',
  },
})

export default Markets