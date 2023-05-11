import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import ApplicationNavigator from './navigators/Application'
import { persistor } from './store/store'

const App = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
)

export default App
