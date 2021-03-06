/* ---------------------------------------------*/
/* --------------- GLOBAL VARIABLES ------------*/
/* ---------------------------------------------*/

import { searchInput } from './DOMRefs';
export { imgFetchOptions };

const imgFetchOptions = {
    API_KEY: '20496318-c7af985c6ce4a327e41f45e16',
    BASE_URL: 'https://pixabay.com/api/',
    imgPerPage: 20,
    currentPage: 1,
    currentImgArray: [],
    query: searchInput.value,
}