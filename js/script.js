
import imagesObjArray from "./imagesArray.js"

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
const backdropRef = Array.from(document.querySelectorAll('.backdrop'));
const menuWrapRef = document.querySelectorAll('.menu-item-wrap');
const menuListItem = document.querySelector('.gallery-menu');
const nightModeSwitch = document.querySelector('.nightMode-checkbox');
const sideMenuSwitch = document.querySelector('.sideMenu-checkbox');


/* ----------------------------*/
/*  GALLERY RENDERING FUNCTION */
/* ----------------------------*/

function galleryImgRender(imagesObjArray) {
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

/* ------------------------------------------*/
/*  MODAL WINDOW OPEN/CLOSE TRIGGER HANDLERS */
/* ------------------------------------------*/

function openModal(event) {
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
      console.log(role);
      authToggleHandler();
      break;
    }
    case 'upload-close': {
      console.log(role);
      uploadToggleHandler();
      break;
    }
    case 'img-close': {
      console.log(role);
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
/*  SIDE MENU ITEM OPEN/CLOSE TOGGLE FUNCTION */
/* -------------------------------------------*/

function sideMenuItemOpen(event) {
  if (!event.target.classList.contains('menu-cat-button')) return;
  const targetItem = event.target.nextElementSibling.classList;
  if (!targetItem.contains('isOpen')) {
    menuWrapRef.forEach(item => item.classList.remove('isOpen'));
    targetItem.add('isOpen');
  } else targetItem.remove('isOpen');
};

/* ----------------------------*/
/*  NIGHT MODE TOGGLE FUNCTION */
/* ----------------------------*/

function nightModeToggle() {
  document.querySelector('body').classList.toggle('light-theme');
};

function modalImageNav(indexShift) {
  const currentIndex = Number(modalImgRef.dataset.index);
  const nextIndex = currentIndex + indexShift;
  if (nextIndex < 0 || nextIndex >= imagesObjArray.length) return;
  modalImgRef.src = `https://picsum.photos/id/${imagesObjArray[nextIndex].id}/1000`;
  modalImgRef.dataset.index = nextIndex;
}

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


galleryImgRender(imagesObjArray);
nightModeSwitch.addEventListener('change', nightModeToggle);
sideMenuSwitch.addEventListener('change', () => { galleryMenu.classList.toggle('is-hidden') });
menuListItem.addEventListener('click', sideMenuItemOpen);
modalOpenTriggersRef.forEach(item => item.addEventListener("click", openModal));
modalCloseTriggersRef.forEach(item => item.addEventListener("click", closeModal));
modalImgNav.forEach(item => item.addEventListener("click", modalImgTriggerHandler));