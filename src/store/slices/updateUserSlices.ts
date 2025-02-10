import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UpdateUserState {
  loading: boolean
  success: boolean
  error: string | null
}

const initialState: UpdateUserState = {
  loading: false,
  success: false,
  error: null,
}

const updateUserSlice = createSlice({
  name: 'updateUser',
  initialState,
  reducers: {
    updateUserStart: (state) => {
      state.loading = true
      state.error = null
    },
    updateUserSuccess: (state) => {
      state.loading = false
      state.success = true
      state.error = null
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.success = false
      state.error = action.payload
    },
    resetUpdateState: (state) => {
      state.loading = false
      state.success = false
      state.error = null
    },
  },
})

export const { updateUserStart, updateUserSuccess, updateUserFailure } =
  updateUserSlice.actions

export const updateUserReducer = updateUserSlice.reducer
