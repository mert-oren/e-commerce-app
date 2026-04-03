import axios from "axios";
import { getAuthHeaders } from "./auth.js";

export function createOrder(productId) {
  return axios.post(
    "/orders",
    {
      productId: Number(productId),
      quantity: 5,
    },
    getAuthHeaders(),
  );
}
