import { searchInput, galleryPageRef} from './DOMRefs';
import {imgFetchOptions} from './globalVar';

export { inputQueryHandler };

function inputQueryHandler() {
    imgFetchOptions.query = searchInput.value;
    imgFetchOptions.currentImgArray = [];
    imgFetchOptions.currentPage = 1;
    galleryPageRef.innerHTML = '';
}