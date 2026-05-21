import axios from "axios";

const API_URL = import.meta.env.VITE_PDV_API_URL || "http://localhost:3333";

export async function listStoreProducts() {
  const response = await axios.get(`${API_URL}/public/products`);

  return response.data.products;
}