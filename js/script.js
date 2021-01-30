
import imagesObjArray from "./imagesArray.js"
//----------------------- MODAL WINDOW SHOW/HIDE ---------------//
{
(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();
}
//------------------------------ MOBILE MENU SHOW/HIDE ------------------//
{
(() => {
  const menuBtnRef = document.querySelector("[data-menu-button]");
  const mobileMenuRef = document.querySelector("[data-menu]");

  menuBtnRef.addEventListener("click", () => {
    const expanded = menuBtnRef.getAttribute("aria-expanded") === "true" || false;
    menuBtnRef.classList.toggle("is-open");
    menuBtnRef.setAttribute("aria-expanded", !expanded);
    mobileMenuRef.classList.toggle("is-open");
  })
})();
}
//---------------------------- GALLERY MENU HANDLER  ------------------//

{const menuWrapRef = document.querySelectorAll('.menu-item-wrap');
const menuListItem = Array.from(document.querySelectorAll('.menu-cat-button'));
function menuItemOpen(event) {
  const targetItem = event.target.nextElementSibling.classList;
  if (!targetItem.contains('isOpen')) {
    menuWrapRef.forEach(item => item.classList.remove('isOpen'));
    targetItem.add('isOpen');
  } else targetItem.remove('isOpen');

};
menuListItem.forEach(item => item.addEventListener('click', menuItemOpen));
}
//------------------------------- DAY/NIGHT STYLE SWITCH --------------------//
{
const nightModeSwitch = document.querySelector('.nightMode-checkbox');
function nightModeToggle() {
  document.querySelector('body').classList.toggle('light-theme');
}
nightModeSwitch.addEventListener('change', nightModeToggle);
}
//-------------------------------  GALLERY PAGE IMAGES GENERATION  -------------------//

const galleryPageRef = document.querySelector('.gallery-page');
function galleryImgRender(imagesObjArray) {
  const imgRenderArray = imagesObjArray.map(el => {
    return `<div class="gallery-page-wrap">
          <div class="gallery-page-img-wrap">
              <img
                class="gallery-page-img"
                src="https://picsum.photos/id/${el.id}/250"
                srcset="https://picsum.photos/id/${el.id}/250 1x, https://picsum.photos/id/${el.id}/500 2x"
                alt="image"
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
galleryImgRender(imagesObjArray);
