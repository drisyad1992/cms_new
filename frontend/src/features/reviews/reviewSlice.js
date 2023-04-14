import { createSlice } from '@reduxjs/toolkit';
import reviewService from './reviewService';

const initialState = {
  review: null,
  error: null,
  loading: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    createReviewDraftStart(state) {
      state.loading = true;
      state.error = null;
    },
    createReviewDraftSuccess(state, action) {
      state.loading = false;
      state.review = action.payload;
    },
    createReviewDraftFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createReviewSubmitStart(state) {
      state.loading = true;
      state.error = null;
    },
    createReviewSubmitSuccess(state, action) {
      state.loading = false;
      state.review = action.payload;
    },
    createReviewSubmitFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createReviewDraftStart,
  createReviewDraftSuccess,
  createReviewDraftFailure,
  createReviewSubmitStart,
  createReviewSubmitSuccess,
  createReviewSubmitFailure,
} = reviewSlice.actions;

export const createReviewDraft = (id, data) => async (dispatch) => {
  dispatch(createReviewDraftStart());
  try {
    const review = await reviewService.createReviewDraft(id, data);
    dispatch(createReviewDraftSuccess(review));
  } catch (error) {
    dispatch(createReviewDraftFailure(error.message));
  }
};

export const createReviewSubmit = (id, data) => async (dispatch) => {
  dispatch(createReviewSubmitStart());
  try {
    const review = await reviewService.createReviewSubmit(id, data);
    dispatch(createReviewSubmitSuccess(review));
  } catch (error) {
    dispatch(createReviewSubmitFailure(error.message));
  }
};

export default reviewSlice.reducer;
