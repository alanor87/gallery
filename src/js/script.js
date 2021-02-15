
import "../sass/main.scss";
import imagesObjArray from "./imagesArray.js";
import galleryImgRender from "./gallery-render.js";
import nightModeToggle from "./night-mode-toggle.js";
import sideMenuItemOpen from "./side-menu-item-toggle";

const modalOpenTriggersRef = Array.from(document.querySelectorAll("[data-mod-open-trigger]"));
const modalCloseTriggersRef = Array.from(document.querySelectorAll("[data-mod-close-trigger]"));
const modalAuthRef = document.querySelector('[data-auth-modal]')
const modalImgWindowRef = document.querySelector('[data-img-modal]');
const modalUploadRef = document.querySelector('[data-upload-modal]');
const modalNavRef = document.querySelector('[data-nav-modal]');
const modalImgRef = document.querySelector('.modal-image');
const modalImgNav = document.querySelectorAll('.image-nav-arrow')
const galleryPageRef = document.querySelector('.gallery-page');
const galleryMenu = document.querySelector('.gallery-menu');
const menuListItem = document.querySelector('.gallery-menu');
const nightModeSwitch = document.querySelector('.nightMode-checkbox');
const sideMenuSwitch = document.querySelector('.sideMenu-checkbox');


/* ------------------------------------------*/
/*  MODAL WINDOW OPEN/CLOSE TRIGGER HANDLERS */
/* ------------------------------------------*/

function openModal(event) {
  const backdropRef = Array.from(document.querySelectorAll('.backdrop'));
  const role = event.currentTarget.dataset.modOpenTrigger;
  backdropRef.forEach(backdrop => backdrop.classList.add('modal-hidden'));
  switch (role) {
    case 'nav-open': {
      navToggleHandler();
      break;
    }
    case 'auth-open': {
      authToggleHandler();
      break;
    }
    case 'img-open': {
      imgToggleHandler(event);
      break;
    }
    case 'upload-open': {
      event.preventDefault();
      uploadToggleHandler();
      break;
    }
  }
};

 function closeModal(event) {
  const role = event.currentTarget.dataset.modCloseTrigger;
  if (event.target !== event.currentTarget) return;
  switch (role) {
    case 'nav-close': {
      navToggleHandler();
      break;
    }
    case 'auth-close': {
      authToggleHandler();
      break;
    }
    case 'upload-close': {
      uploadToggleHandler();
      break;
    }
    case 'img-close': {
      imgToggleHandler('close');
      break;
    }
  }
};

/* ----------------------------------------------------*/
/*  SPECIFIC MODAL WINDOWS OPEN/CLOSE TOGGLE FUNCTIONS */
/* ----------------------------------------------------*/

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

/* -------------------------------------------*/
/* --------- MODAL IMAAGE NAVIGATION ---------*/
/* -------------------------------------------*/

 function modalImgTriggerHandler(event) {
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

galleryImgRender(imagesObjArray, galleryPageRef);

nightModeSwitch.addEventListener('change', nightModeToggle);
sideMenuSwitch.addEventListener('change', () => { galleryMenu.classList.toggle('is-hidden') });
menuListItem.addEventListener('click', sideMenuItemOpen);
modalOpenTriggersRef.forEach(item => item.addEventListener("click", openModal));
modalCloseTriggersRef.forEach(item => item.addEventListener("click", closeModal));
modalImgNav.forEach(item => item.addEventListener("click", modalImgTriggerHandler));