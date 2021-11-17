import axios from 'axios';

const API_KEY = '23477819-44226e1e125dfcf9362a81201';
const BASE_URL = 'https://pixabay.com/api/';

export default  function  API (query, page) {
      return axios.get(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&${page}=1&per_page=12&key=${API_KEY}`);

   }
