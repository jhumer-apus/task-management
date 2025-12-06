import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api", // change to your API
  headers: {
    "Content-Type": "application/json",
  },
});
