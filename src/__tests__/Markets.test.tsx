import React from 'react'
import { render } from '@testing-library/react-native'
import Markets from '../screens/Markets'
import { Provider } from 'react-redux'
import { store } from '../store/store'  

describe('Markets screen', () => {
  it('renders properly', () => {
    const markets = render(
      <Provider store={store}>
        <Markets />
      </Provider>
    )
    expect(markets).toBeDefined()
  })

  it('displays loader whilst loading', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Markets />
      </Provider>
    )
    expect(getByTestId('loader')).toBeTruthy()
  })
})