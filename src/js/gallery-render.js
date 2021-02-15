/* ----------------------------*/
/*  GALLERY RENDERING FUNCTION */
/* ----------------------------*/

import { galleryPageRef } from "./DOMRefs";

export default function galleryImgRender(imagesObjArray) {
    const imgRenderArray = imagesObjArray.map((el, index) => {
        return `<div class="gallery-page-wrap">
          <div class="gallery-page-img-wrap">
              <img
                class="gallery-page-img"
                src="https://picsum.photos/id/${el.id}/250"
                srcset="https://picsum.photos/id/${el.id}/250 1x, https://picsum.photos/id/${el.id}/500 2x"
                alt="image"
                data-src="https://picsum.photos/id/${el.id}/1000"
                data-index="${index}"
              />
          </div>
          <div class="gallery-page-text">
            <h2 class="gallery-page-header">${el.author}</h2>
            <p class="gallery-page-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.</br> Index : ${index}. 
            </p>
          </div>
        </div>`;
    });
  galleryPageRef.insertAdjacentHTML('afterbegin', imgRenderArray.join(''));
};
