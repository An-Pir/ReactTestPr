import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/calculators';

export const fetchCalculators = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const calculateResult = async (requestData) => {
  const response = await axios.post(`${API_BASE_URL}/calculate`, requestData);
  return response.data;
};