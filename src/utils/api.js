import axios from "axios";

const BASE_URL = "https://www.googleapis.com/customsearch/v1";
const params = {
  // key: process.env.REACT_APP_API_KEY,
  // cx: process.env.CX,

  key: "AIzaSyBxJPmuNmlvE_ifvLQfWYIIvbLvfnDDTvw",
  cx: "47acc0d92db084ae1",
};
export const fetchDataFromApi = async (payload) => {
  const { data } = await axios.get(BASE_URL, {
    params: { ...params, ...payload },
  });
  return data;
};
