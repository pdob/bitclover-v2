import React from 'react'
import { fireEvent, render, cleanup } from '@testing-library/react-native'
import Settings from '../screens/Settings'
import configureStore from 'redux-mock-store'
import { RootState } from '../store/store'
import { Provider } from 'react-redux'
import MockNav from '../__mocks__/MockNav'

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

const mockNav: any = {
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {},
  },
}

const mockedStore = mockStore(mockState)

describe('Settings', () => {
  afterEach(() => cleanup())
  const navSpy = jest.spyOn(mockNav.navigation, 'navigate')

  it('renders', () => {
    const settings = render(
      <Provider store={mockedStore}>
        <MockNav component={Settings} />
      </Provider>
    )
    expect(settings).toBeDefined()
  })

  it('navigates to terms', () => {
    const { getByTestId } = render(
      <Provider store={mockedStore}>
        <Settings 
          {...mockNav}
        />
      </Provider>
    )
    const termsButton = getByTestId('Settings_terms')
    fireEvent.press(termsButton)
    expect(navSpy).toBeCalledWith('Terms')
  })

  it('navigates to terms', () => {
    const { getByTestId } = render(
      <Provider store={mockedStore}>
        <Settings 
          {...mockNav}
        />
      </Provider>
    )
    const termsButton = getByTestId('Settings_privacy')
    fireEvent.press(termsButton)
    expect(navSpy).toBeCalledWith('Privacy')
  })

  it('shows dropdown and correct options', () => {
    const { getByText, getByTestId } = render(
      <Provider store={mockedStore}>
        <Settings 
          {...mockNav}
        />
      </Provider>
    )

    expect(getByTestId('Settings_dropdownCurrency')).toBeDefined()
    expect(getByText('USD')).toBeDefined()
    expect(getByText('AUD')).toBeUndefined()
  })
})