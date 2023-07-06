import { createSlice } from '@reduxjs/toolkit'

interface InitialFavouriteState {
  ids: string[]
}

const initialState: InitialFavouriteState = {
  ids: []
}

export const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.ids = [...state.ids, action.payload]
    },
    removeFavourite: (state, action) => {
      state.ids = [...state.ids.filter(item => item !== action.payload)]
    }
  }
})

export const { addFavourite, removeFavourite } = favouriteSlice.actions

export default favouriteSlice.reducer