
import imagesObjArray from "./imagesArray.js"

const openAuthModalBtn = Array.from(document.querySelectorAll("[data-auth-open]"));
const closeAuthModalBtn = Array.from(document.querySelectorAll("[data-auth-close]"));
const modalAuthlRef = document.querySelector("[data-auth-modal]");
const galleryPageRef = document.querySelector('.gallery-page');
const galleryMenu = document.querySelector('.gallery-menu');
const backdropRef = Array.from(document.querySelectorAll('.backdrop'));
const modalImgWindowRef = document.querySelector('[data-img-modal]');
const menuBtnRef = document.querySelector("[data-menu-button]");
const modalNavRef = document.querySelector("[data-nav-modal]");
const modalImgRef = document.querySelector('.modal-image');
const menuWrapRef = document.querySelectorAll('.menu-item-wrap');
const menuListItem = Array.from(document.querySelectorAll('.menu-cat-button'));
const nightModeSwitch = document.querySelector('.nightMode-checkbox');
const sideMenuSwitch = document.querySelector('.sideMenu-checkbox');

function galleryImgRender(imagesObjArray) {
  const imgRenderArray = imagesObjArray.map(el => {
    return `<div class="gallery-page-wrap">
          <div class="gallery-page-img-wrap">
              <img
                class="gallery-page-img"
                src="https://picsum.photos/id/${el.id}/250"
                srcset="https://picsum.photos/id/${el.id}/250 1x, https://picsum.photos/id/${el.id}/500 2x"
                alt="image"
                data-src="https://picsum.photos/id/${el.id}/1000"
              />
          </div>
          <div class="gallery-page-text">
            <h2 class="gallery-page-header">${el.author}</h2>
            <p class="gallery-page-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            </p>
          </div>
        </div>`;
  });
  galleryPageRef.insertAdjacentHTML('afterbegin', imgRenderArray.join(''));
}

function backdropCloseHandler(event) {
  if (event.target.classList.contains('modal-wrapper')) {
    event.currentTarget.classList.add('modal-hidden');
    modalImgRef.src = '';
  }
}

function modalAuthHandler() {
  modalAuthlRef.classList.toggle("modal-hidden");
};

function mobileMenuHandler() {
  modalNavRef.classList.toggle("modal-hidden");
};

function openModalImgHandler(event) {
  const target = event.target;
  if (target.classList.contains('gallery-page-img')) {
    modalImgRef.src = target.dataset.src;
    modalImgWindowRef.classList.toggle('modal-hidden');
  };
};

function sideMenuItemOpen(event) {
  const targetItem = event.target.nextElementSibling.classList;
  if (!targetItem.contains('isOpen')) {
    menuWrapRef.forEach(item => item.classList.remove('isOpen'));
    targetItem.add('isOpen');
  } else targetItem.remove('isOpen');

};

function nightModeToggle() {
  document.querySelector('body').classList.toggle('light-theme');
};

galleryImgRender(imagesObjArray);
nightModeSwitch.addEventListener('change', nightModeToggle);
sideMenuSwitch.addEventListener('change', () => { galleryMenu.classList.toggle('is-hidden') });
menuListItem.forEach(item => item.addEventListener('click', sideMenuItemOpen));
galleryPageRef.addEventListener('click', openModalImgHandler);
menuBtnRef.addEventListener("click", mobileMenuHandler);
openAuthModalBtn.forEach(btn => btn.addEventListener("click", modalAuthHandler));
closeAuthModalBtn.forEach(btn => btn.addEventListener("click", modalAuthHandler));
backdropRef.forEach(backdrop => {
  backdrop.addEventListener('click', (backdropCloseHandler))
});

