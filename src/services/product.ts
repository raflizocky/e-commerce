import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getFeaturedProducts = async () => {
  const res = await axios.get(`${API_URL}/products`, {
    params: { is_featured: true, per_page: 8 },
  });
  return res.data.data; // Laravel resource collection returns { data: [...] }
};

export const getRecommendedProducts = async () => {
  const res = await axios.get(`${API_URL}/products`, {
    params: { is_recommended: true, per_page: 6 },
  });
  return res.data.data;
};

export const getProducts = async (page = 1) => {
  const res = await axios.get(`${API_URL}/products`, {
    params: { per_page: 6, page: page },
  });
  return res.data.data;
};