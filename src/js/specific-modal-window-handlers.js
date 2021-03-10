/* ----------------------------------------------------*/
/*  SPECIFIC MODAL WINDOWS OPEN/CLOSE TOGGLE FUNCTIONS */
/* ----------------------------------------------------*/

import { modalNavRef, modalAuthRef, modalUploadRef, modalImgWindowRef, modalImgRef } from "./DOMRefs";

export function navToggleHandler() {
    modalNavRef.classList.toggle("modal-hidden");
};
export function authToggleHandler() {
    modalAuthRef.classList.toggle("modal-hidden");
};
export function uploadToggleHandler() {
    modalUploadRef.classList.toggle("modal-hidden");
};
export function imgToggleHandler(event) {
    const target = event.target;
    if (event === 'close') {
        modalImgWindowRef.classList.toggle("modal-hidden");
        modalImgRef.src = '';
        return;
    };
    if (target.classList.contains('gallery-page-img')) {
        modalImgRef.src = target.dataset.src;
        modalImgRef.dataset.index = target.dataset.index;
        modalImgWindowRef.classList.toggle("modal-hidden");
    };
};