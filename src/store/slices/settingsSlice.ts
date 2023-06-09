import { createSlice } from '@reduxjs/toolkit'
import { SupportedCurrencies, AvailableScreens } from '../../types/Home'

interface SettingsSliceState {
  currency: SupportedCurrencies
  initialScreen: AvailableScreens
}

const initialState: SettingsSliceState = {
  currency: 'GBP',
  initialScreen: 'Home'
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeCurrency: (state, action) => {
      state.currency = action.payload
    },
    changeInitialScreen: (state, action) => {
      state.initialScreen = action.payload
    }
  }
})

export const { changeCurrency, changeInitialScreen } = settingsSlice.actions

export default settingsSlice.reducer