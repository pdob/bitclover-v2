import React, { ReactNode } from 'react'
import { render } from '@testing-library/react-native'
import Favourites from '../screens/Favourites'
import { Provider } from 'react-redux'
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

describe('Favourites screen', () => {
  it('renders properly', () => {
    const markets = render(
      <Provider store={mockedStore}>
        <MockNav component={Favourites} />
      </Provider>, { wrapper }
    )
    expect(markets).toBeDefined()
  })
})