import axios from "axios";

const ACCESS_KEY = "bCTnfOMu8IlWhiD2j0dZdbsso5tmrkFgFkdJqJ9WaCU";

axios.defaults.baseURL = "https://api.unsplash.com/";
const itemsPerPage = 20;

const fetchImagesFromUnsplash = async (query, page) => {
  const response = await axios.get(
    `/search/photos?client_id=${ACCESS_KEY}&query=${query}&page=${page}&per_page=${itemsPerPage}&orientation=landscape`
  );

  return response.data.results;
};

export default fetchImagesFromUnsplash;
