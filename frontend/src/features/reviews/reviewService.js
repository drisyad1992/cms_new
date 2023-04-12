import axios from 'axios';

export const createReviewDraftService = async (paperId, reviewData) => {
  try {
    const { data } = await axios.post(`/api/reviews/draft/${paperId}`, reviewData);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createReviewSubmitService = async (paperId, reviewData) => {
  try {
    const { data } = await axios.post(`/api/reviews/submit/${paperId}`, reviewData);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};
