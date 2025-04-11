import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface FavoriteState {
  favorites: number[]; // Assuming IDs of events are stored as favorites
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      // console.log(state);
      // console.log(action);
      const index = state.favorites.indexOf(action.payload);
      console.log('index >> ' + index);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
});

export const {toggleFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
