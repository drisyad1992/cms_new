import axios from 'axios';

const API_URL = '/api/reviews';

const createReviewDraft = async (id, data) => {
  const response = await axios.post(`${API_URL}/draft/${id}`, data);
  return response.data;
};

const createReviewSubmit = async (id, data) => {
  const response = await axios.post(`${API_URL}/submit/${id}`, data);
  return response.data;
};

const reviewService = {
  createReviewDraft,
  createReviewSubmit,
}

export default reviewService
