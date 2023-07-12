import { createSlice } from '@reduxjs/toolkit'

interface FavouriteSliceState {
  ids: string[]
}

const initialState: FavouriteSliceState = {
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