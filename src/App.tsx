import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import ApplicationNavigator from './navigators/Application'
import { persistor } from './store/store'

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <ApplicationNavigator />
    </PersistGate>
  </Provider>
)

export default App
