/* ----------------------------*/
/*  GALLERY RENDERING FUNCTION */
/* ----------------------------*/

import { intersectionAnchorGalleryRef, galleryPageRef } from "./DOMRefs";
import { imgFetchOptions } from './globalVar';
export { galleryImgRender };

function galleryImgRender(imagesObjArray) {
  const imgRenderArray = imagesObjArray.map((el, index) => {
    const imgIndex = index + (imgFetchOptions.currentPage - 1) * imgFetchOptions.imgPerPage;
    return `<div class="gallery-page-card-wrap">
          <div class="gallery-page-img-wrap">
              <img
                class="gallery-page-img"
                src="${el.previewURL}"
                alt="image"
                data-src="${el.largeImageURL}"
                data-index="${imgIndex}"
              />
          </div>
          <div class="gallery-page-text">
            <h2 class="gallery-page-header">${el.user}</h2>
            <p class="gallery-page-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.</br> Index : ${imgIndex}.
            </p>
          </div>
        </div>`;
  });
  galleryPageRef.insertAdjacentHTML('beforeend', imgRenderArray.join(''));
};
