import axios from 'axios';
import { toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_KEY = '23477819-44226e1e125dfcf9362a81201';
const BASE_URL = 'https://pixabay.com/api/';
toast.configure();
export default function API(query, page) {
  return axios
    .get(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${API_KEY}`,
    )
    .then(res => {
      if (res.status === 200) {
        const { hits } = res.data;
        return hits;
      }
      if (res.status === 404) {
        toast.error('Images are not exist', { transition: Flip });
      }
    });
}
