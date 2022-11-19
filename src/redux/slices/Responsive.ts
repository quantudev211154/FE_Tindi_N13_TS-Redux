import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RESPONSIVE } from '../../constants/ReduxConstant'
import { RootState } from '../../redux_store'
import { ResponsiveType } from '../types/ResponsiveTypes'

const initialState: ResponsiveType = {
  isOpenMessageList: false,
}

const responsiveSlide = createSlice({
  name: RESPONSIVE,
  initialState,
  reducers: {
    openMessageList: (state, action: PayloadAction<boolean>) => {
      state.isOpenMessageList = action.payload
    },
  },
})

export const responsiveState = (state: RootState) => state.responsive
export const responsiveActions = responsiveSlide.actions
export default responsiveSlide.reducer
