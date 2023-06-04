import React from 'react'
import { render } from '@testing-library/react-native'
import Favourites from '../screens/Favourites'
import { Provider } from 'react-redux'
import { store } from '../store/store'  
import MockNav from '../__mocks__/MockNav'

describe('Favourites screen', () => {
  it('renders properly', () => {
    const markets = render(
      <Provider store={store}>
        <MockNav component={Favourites} />
      </Provider>
    )
    expect(markets).toBeDefined()
  })
})