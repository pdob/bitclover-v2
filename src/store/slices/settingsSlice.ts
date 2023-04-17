import { createSlice } from "@reduxjs/toolkit"

export const settingsSlice = createSlice({
  name: 'currency',
  initialState: {
    currency: 'GBP',
    initialScreen: 'Home'
  },
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