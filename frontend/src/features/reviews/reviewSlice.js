import { createSlice } from '@reduxjs/toolkit';
import { createReviewDraftService, createReviewSubmitService } from './reviewService';

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    review: null,
    loading: false,
    error: null,
  },
  reducers: {
    createReviewDraftRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createReviewDraftSuccess: (state, action) => {
      state.loading = false;
      state.review = action.payload;
    },
    createReviewDraftFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createReviewSubmitRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createReviewSubmitSuccess: (state, action) => {
      state.loading = false;
      state.review = action.payload;
    },
    createReviewSubmitFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createReviewDraftRequest,
  createReviewDraftSuccess,
  createReviewDraftFail,
  createReviewSubmitRequest,
  createReviewSubmitSuccess,
  createReviewSubmitFail,
} = reviewSlice.actions;

export const createReviewDraft = (id, reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewDraftRequest());
    const data = await createReviewDraftService(id, reviewData);
    dispatch(createReviewDraftSuccess(data));
  } catch (error) {
    dispatch(createReviewDraftFail(error.message));
  }
};

export const createReviewSubmit = (id, reviewData) => async (dispatch) => {
  try {
    dispatch(createReviewSubmitRequest());
    const data = await createReviewSubmitService(id, reviewData);
    dispatch(createReviewSubmitSuccess(data));
  } catch (error) {
    dispatch(createReviewSubmitFail(error.message));
  }
};

export default reviewSlice.reducer;

