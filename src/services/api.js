import axios from "axios";
// BASE DA URL: https://api.themoviedb.org/3/
// URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=335bc4df550dd78e089ac9f71f71f692

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

export default api;