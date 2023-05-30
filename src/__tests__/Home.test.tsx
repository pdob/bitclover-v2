import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import Home, { sortData } from '../screens/Home'
import appClient from '../clients/AppClient'
import { Provider } from 'react-redux'
import { store } from  '../store/store'
import { CoinData } from '../types/Home'

jest.mock('../clients/AppClient')

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders', () => {
    const home = render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(home).toBeDefined()
  })

  it('renders with all the flatlists and correct API calls', async () => {
    const clientSpy = jest.spyOn(appClient, 'getAllCoinPrices')

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const getPrices = clientSpy.mockResolvedValueOnce(new Promise(() => {}))

    const { getByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    expect(getByText('Most Popular')).toBeTruthy()
    expect(getByText('Highest Gainers')).toBeTruthy()
    expect(getByText('Biggest Losers')).toBeTruthy()

    await waitFor(() => expect(getPrices).toHaveBeenCalled())
  })

  it('handles error during data fetching', async () => {
    
    const clientSpy = jest.spyOn(appClient, 'getAllCoinPrices')

    clientSpy.mockRejectedValueOnce({ status: {
      error_code: 500,
      error_message: 'API Error'
    }})

    const { findByText } = render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
  
    const errorMessage = await findByText('API Error ( Free API Limitations :( )')

    expect(errorMessage).toBeTruthy()
  })

  it('groups coin info data correctly', async () => {
    const mockCoinData: CoinData[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        current_price: 25000,
        image: 'sampleurl',
        price_change_24h: 1250,
        price_change_percentage_24h: 10
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        current_price: 1500,
        image: 'sampleurl',
        price_change_24h: -10,
        price_change_percentage_24h: -1.5
      },
      {
        id: 'binancecoin',
        name: 'BNB',
        current_price: 250.50,
        image: 'sampleurl',
        price_change_24h: 10,
        price_change_percentage_24h: 2.5
      }
    ]
    
    const sortedData = sortData(mockCoinData)
    expect(sortedData.loss[0].id).toEqual('ethereum')
  })
})