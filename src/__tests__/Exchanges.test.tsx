import React from 'react'
import { render } from '@testing-library/react-native'
import Exchanges from '../screens/Exchanges'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { RootState } from '../store/store'


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

describe('Markets screen', () => {
  it('renders properly', () => {
    const markets = render(
      <Provider store={mockedStore}>
        <Exchanges />
      </Provider>
    )
    expect(markets).toBeDefined()
  })

  it('displays loader whilst loading', () => {
    const { getByTestId } = render(
      <Provider store={mockedStore}>
        <Exchanges />
      </Provider>
    )
    expect(getByTestId('loader')).toBeTruthy()
  })
})