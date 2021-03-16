import { galleryImgRender } from './gallery-render';
import { imgFetchOptions } from './globalVar';
export { fetchImages };

function fetchImages() {
    const { BASE_URL, API_KEY, query, currentPage, imgPerPage } = imgFetchOptions;
    const requestURL = `${BASE_URL}?key=${API_KEY}&q=${query}&page=${currentPage}&per_page=${imgPerPage}`;
    return fetch(requestURL)
        .then(responce => responce.json())
        .then(responce => {
            galleryImgRender(responce.hits);
            imgFetchOptions.currentPage += 1;
            imgFetchOptions.currentImgArray.push(...responce.hits);
        });
}
