import React, { ReactNode } from 'react'
import { render } from '@testing-library/react-native'
import Home, { sortData } from '../screens/Home'
import { Provider } from 'react-redux'
import { CoinData } from '../types/Home'
import MockNav from '../__mocks__/MockNav'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import configureStore from 'redux-mock-store'
import { RootState } from '../store/store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity
    }
  }
})

const mockStore = configureStore([])

const mockState: Partial<RootState> = {
  settings: {
    currency: 'USD',
    initialScreen: 'Home'
  },
  favourites: {
    ids: []
  }
}

const mockedStore = mockStore(mockState)

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders', () => {
    const home = render(
      <Provider store={mockedStore}>
        <MockNav component={Home} />
      </Provider>
      , { wrapper })
    expect(home).toBeDefined()
  })

  it('groups coin info data correctly', async () => {
    const mockCoinData: CoinData[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        current_price: 25000,
        image: 'sampleurl',
        price_change_24h: 1250,
        price_change_percentage_24h: 10,
        market_cap_rank: 1,
        symbol: 'BTC'
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        current_price: 1500,
        image: 'sampleurl',
        price_change_24h: -10,
        price_change_percentage_24h: -1.5,
        market_cap_rank: 2,
        symbol: 'ETH'
      },
      {
        id: 'binancecoin',
        name: 'BNB',
        current_price: 250.50,
        image: 'sampleurl',
        price_change_24h: 10,
        price_change_percentage_24h: 2.5,
        market_cap_rank: 3,
        symbol: 'BNB'
      }
    ]
    
    const sortedData = sortData(mockCoinData)
    expect(sortedData.loss[0].id).toEqual('ethereum')
  })
  
})