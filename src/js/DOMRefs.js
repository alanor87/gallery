/* -------------------------------------------*/
/* --------------- DOM REFERENCES ------------*/
/* -------------------------------------------*/

const bodyRef = document.querySelector('body');
const menuWrapRef = document.querySelectorAll('.menu-item-wrap');
const galleryPageRef = document.querySelector('.gallery-page');
const backdropRef = Array.from(document.querySelectorAll('.backdrop'));
const modalAuthRef = document.querySelector('[data-auth-modal]');
const modalNavRef = document.querySelector('[data-nav-modal]');
const modalImgRef = document.querySelector('.modal-image');
const modalImgWindowRef = document.querySelector('[data-img-modal]');
const modalUploadRef = document.querySelector('[data-upload-modal]');
const galleryMenuRef = document.querySelector('.gallery-menu');
const nightModeSwitch = document.querySelector('.nightMode-checkbox');
const intersectionAnchorGalleryRef = document.querySelector('.intersection-anchor')

export {
    bodyRef, menuWrapRef, galleryPageRef, backdropRef, modalAuthRef, modalNavRef,
    modalImgRef, modalImgWindowRef, modalUploadRef, galleryMenuRef, nightModeSwitch,
    intersectionAnchorGalleryRef
}
