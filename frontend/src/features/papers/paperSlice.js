import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import paperService from './paperService'

const initialState = {
  papers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new paper
export const createPaper = createAsyncThunk(
  'papers/create',
  async (paperData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await paperService.createPaper(paperData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user papers
export const getPapers = createAsyncThunk(
  'papers/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await paperService.getPapers(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user paper
export const deletePaper = createAsyncThunk(
  'papers/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await paperService.deletePaper(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const paperSlice = createSlice({
  name: 'paper',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaper.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPaper.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.papers.push(action.payload)
      })
      .addCase(createPaper.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPapers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPapers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.papers = action.payload
      })
      .addCase(getPapers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePaper.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePaper.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.papers = state.papers.filter(
          (paper) => paper._id !== action.payload.id
        )
      })
      .addCase(deletePaper.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = paperSlice.actions
export default paperSlice.reducer