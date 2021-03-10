/* -------------------------------------------*/
/* --------- MODAL IMAAGE NAVIGATION ---------*/
/* -------------------------------------------*/
import { currentImgArray, imgPerPage } from "./globalVar";
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
    if (nextIndex < 0 || nextIndex >= imgPerPage) return;
    console.log(nextIndex + ' ' + imgPerPage);
    modalImgRef.src = `https://picsum.photos/id/${currentImgArray[nextIndex].id}/1000`;
    modalImgRef.dataset.index = nextIndex;
}
