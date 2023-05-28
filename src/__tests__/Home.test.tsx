import React from 'react'
import { render } from '@testing-library/react-native'
import Home from '../screens/Home'
import appClient from '../clients/AppClient'
import { Provider } from 'react-redux'
import { store } from  '../store/store'

// Mock the getAllCoinPrices function from the appClient module
appClient.getAllCoinPrices = jest.fn()

describe('Home component', () => {
  it('renders properly', () => {
    const home = render(
      <Provider store={store}>
        <Home />
      </Provider>
    )
    expect(home).toBeDefined()
  })

  it('handles error during data fetching', async () => {
    // Mock the getAllCoinPrices function from AppClient to throw an error
    appClient.getAllCoinPrices.mockRejectedValueOnce({ status: {
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
})