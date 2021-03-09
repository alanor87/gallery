import galleryImgRender from './gallery-render';

export function fetchImages(imgPerPage, currentImgArray) {
    return fetch(`https://picsum.photos/v2/list?page=2&limit=${imgPerPage}`)
        .then(responce => responce.json())
        .then(responce => {
            galleryImgRender(responce);
            currentImgArray.push(...responce);
            console.log(currentImgArray);
        });
}