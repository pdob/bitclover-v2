import React, { useState, useEffect} from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  Image 
} from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../constants/colors'
import { useAppSelector } from '../hooks/redux'
import appClient from '../clients/AppClient'
import { CoinData } from '../types/Home'
import MarketListItem from '../components/MarketListItem'
import { handleError } from '../functions/utils'
import Error from '../components/Error'
import ListEmpty from '../components/ListEmpty'
import Loader from '../components/Loader'

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

const Header = ({
  searchVisible,
  query,
  handleSearch,
  setSearchVisible,
  handlePress
} : {
  searchVisible: boolean
  query: string
  handleSearch: (query: string) => void
  setSearchVisible: (searchVisible: boolean) => void
  handlePress: (searchProp: string) => void
}) => (
  <View style={styles.header}>
    {searchVisible ? (
      <>
        <View style={{ flex: 1,  flexDirection: 'row', justifyContent: 'center', paddingLeft: 75 }}>
          <TextInput
            value={query}
            onChangeText={handleSearch}
            style={{ 
              height: 30, 
              width: 125, 
              backgroundColor: colors.backgroundTernary, 
              borderRadius: 10,
              paddingLeft: 5,
              color: colors.text 
            }}
            autoFocus
            selectionColor={colors.text}
          />
        </View>
        <Pressable
          onPress={() => setSearchVisible(!searchVisible)}
          style={{ padding: 5, alignItems: 'center', width: 75 }}
        >
          <Text style={{ color: colors.text, fontWeight: '700' }}>
            Cancel
          </Text>
        </Pressable>
      </>
    ) : (
      <>
        <Pressable
          style={styles.headerSearch}
          onPress={() => setSearchVisible(!searchVisible)}
        >
          <Image
            source={require('../assets/icons/search.png')}
            style={{ height: 22.5, width: 22.5 }} />
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
      </>
    )}
  </View>
)
  

const Markets = () => {

  const [data, setData] = useState<CoinData[]>([])
  const [filteredData, setFilteredData] = useState<CoinData[]>([])
  const [sortedData, setSortedData] = useState<CoinData[]>([])
  const [query, setQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [searchVisible, setSearchVisible] = useState<boolean>(false)

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
        setLoading(true)
        const json = await appClient.getAllCoinPrices(currency, 500)
        if(json.status) {
          setError(handleError(json.status.error_message))
        } else  {
          setData(json)
          setFilteredData(json)
        }
        setLoading(false)
      } catch (error) {
        setError(handleError(error.message))
        setLoading(false)
      }
    }
    getData()
  }, [currency])

  useEffect(() => {
    setSortedData(filteredData?.slice().sort(sortBy(sortProperty, sortOrder)))
  }, [sortProperty, sortOrder, filteredData])

  const handleSearch = (query: string) => {
    setQuery(query)
    const newData = data.filter((item) => 
      item.name.toLowerCase().includes(query.toLowerCase()) 
      || item.symbol.toLowerCase().includes(query.toLowerCase()))
    setFilteredData(newData)
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <Loader /> : error ? <Error error={error} /> : (
        <>
          <View>
            <Header 
              searchVisible={searchVisible}
              query={query}
              handleSearch={handleSearch}
              handlePress={handlePress}
              setSearchVisible={setSearchVisible}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FlashList
              estimatedItemSize={75}
              data={query ? filteredData : sortedData}
              renderItem={renderMarketItem}
              ItemSeparatorComponent={() => <View style={{ backgroundColor: colors.separator, height: 0.5 }} />}
              extraData={sortOrder} 
              ListEmptyComponent={() => 
                <ListEmpty message="Sorry, we can't find the asset you're looking for."/>
              }
            />
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
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
})

export default Markets