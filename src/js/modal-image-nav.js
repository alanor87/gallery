/* -------------------------------------------*/
/* --------- MODAL IMAAGE NAVIGATION ---------*/
/* -------------------------------------------*/

import imagesObjArray from "./imagesArray.js";
import { modalImgRef } from "./DOMRefs";

export function modalImgTriggerHandler(event) {
    const direction = event.target.dataset.modalImgNav;
    switch (direction) {
        case 'prev':
            modalImageNav(-1);
            break;
        case 'next':
            modalImageNav(1);
            break;
    }
}

function modalImageNav(indexShift) {
    const currentIndex = Number(modalImgRef.dataset.index);
    const nextIndex = currentIndex + indexShift;
    if (nextIndex < 0 || nextIndex >= imagesObjArray.length) return;
    modalImgRef.src = `https://picsum.photos/id/${imagesObjArray[nextIndex].id}/1000`;
    modalImgRef.dataset.index = nextIndex;
}
