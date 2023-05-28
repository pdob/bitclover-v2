import React from 'react'
import { render } from '@testing-library/react-native'
import Favourites from '../screens/Favourites'
import { Provider } from 'react-redux'
import { store } from '../store/store'  

describe('Favourites screen', () => {
  it('renders properly', () => {
    const markets = render(
      <Provider store={store}>
        <Favourites />
      </Provider>
    )
    expect(markets).toBeDefined()
  })

  it('displays loader whilst loading', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Favourites />
      </Provider>
    )
    expect(getByTestId('loader')).toBeTruthy()
  })
})