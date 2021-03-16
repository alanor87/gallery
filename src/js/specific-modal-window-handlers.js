/* ----------------------------------------------------*/
/*  SPECIFIC MODAL WINDOWS OPEN/CLOSE TOGGLE FUNCTIONS */
/* ----------------------------------------------------*/

import { modalNavRef, modalAuthRef, modalUploadRef, modalImgWindowRef, modalImgRef } from "./DOMRefs";
export { navToggleHandler, authToggleHandler, uploadToggleHandler, imgToggleHandler };

function navToggleHandler() {
    modalNavRef.classList.toggle("modal-hidden");
};
function authToggleHandler() {
    modalAuthRef.classList.toggle("modal-hidden");
};
function uploadToggleHandler() {
    modalUploadRef.classList.toggle("modal-hidden");
};
function imgToggleHandler(event) {
    if (event === 'close') {
        modalImgWindowRef.classList.toggle("modal-hidden");
        modalImgRef.src = '';
        return;
    };
    const target = event.target;
    if (target.classList.contains('gallery-page-img')) {
        modalImgRef.src = target.dataset.src;
        modalImgRef.dataset.index = target.dataset.index;
        modalImgWindowRef.classList.toggle("modal-hidden");
    };
};