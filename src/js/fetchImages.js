import axios from 'axios';

export default async function fetchImages(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '32422672-c7645cbe09fcb5cc079592851';
  const filter = `?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return await axios.get(`${BASE_URL}${filter}`).then(response => response.data);
}
