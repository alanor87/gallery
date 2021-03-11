import galleryImgRender from './gallery-render';
import imgFetchOptions from './globalVar';

export function fetchImages() {
    return fetch(`https://picsum.photos/v2/list?page=${imgFetchOptions.currentPage}&limit=${imgFetchOptions.imgPerPage}`)
        .then(responce => responce.json())
        .then(responce => {
            galleryImgRender(responce);
            imgFetchOptions.currentPage += 1;
            imgFetchOptions.currentImgArray.push(...responce);
            console.log(imgFetchOptions.currentImgArray);
        });
}