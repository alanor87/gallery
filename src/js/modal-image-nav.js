/* -------------------------------------------*/
/* --------- MODAL IMAAGE NAVIGATION ---------*/
/* -------------------------------------------*/
import imgFetchOptions from "./globalVar";
import { modalImgRef } from "./DOMRefs";

export function modalImgTriggerHandler(event) {
    console.log('click!');
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
    const currentImgQuantity = imgFetchOptions.currentImgArray.length;
    if (nextIndex < 0 || nextIndex >= currentImgQuantity) return;
    console.log(nextIndex + ' ' + currentImgQuantity);
    modalImgRef.src = `https://picsum.photos/id/${imgFetchOptions.currentImgArray[nextIndex].id}/1000`;
    modalImgRef.dataset.index = nextIndex;
}
