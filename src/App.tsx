import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/lib/integration/react'
import { store } from './store/store'
import ApplicationNavigator from './navigators/Application'

const App = () => (
  <Provider store={store}>
    <ApplicationNavigator />
  </Provider>
)

export default App
