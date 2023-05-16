/* eslint-disable no-undef */
import 'whatwg-fetch'
import 'react-native-gesture-handler/jestSetup'
import '@testing-library/jest-native/extend-expect'

// jest.mock('react-native-reanimated', () =>
//   require('react-native-reanimated/mock'),
// )

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist')
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  }
})

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
}))

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

