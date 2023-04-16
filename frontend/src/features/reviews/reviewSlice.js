import { createSlice } from '@reduxjs/toolkit';
import reviewService from './reviewService';

const initialState = {
  review: null,
  error: null,
  loading: false,
  reviews: []
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
    getReviewsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getReviewsSuccess(state, action) {
      state.loading = false;
      state.reviews = action.payload;
    },
    getReviewsFailure(state, action) {
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
  getReviewsStart,
  getReviewsSuccess,
  getReviewsFailure,
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

export const getReviewsbyId = (id) => async (dispatch) => {
  dispatch(getReviewsStart());
  try {
    const reviews = await reviewService.getReviewsbyId(id);
    dispatch(getReviewsSuccess(reviews));
  } catch (error) {
    dispatch(getReviewsFailure(error.message));
  }
};

export default reviewSlice.reducer;
