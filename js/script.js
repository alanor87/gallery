
import imagesObjArray from "./imagesArray.js"
const galleryPageRef = document.querySelector('.gallery-page');
const backdropRef = Array.from(document.querySelectorAll('.backdrop'));

//-------------------------------  GALLERY PAGE IMAGES GENERATION  -------------------//

{
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
  galleryImgRender(imagesObjArray);

}

//-------------------------------  BACKDROP CLOSE   -------------------//

{
  backdropRef.forEach(backdrop => {
    backdrop.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal-wrapper')) backdrop.classList.add('modal-hidden');
    })
  }
  )
}
  //----------------------- AUTH MODAL WINDOW SHOW/HIDE ---------------//

  {

    const refs = {
      openAuthModalBtn: Array.from(document.querySelectorAll("[data-auth-open]")),
      closeAuthModalBtn: Array.from(document.querySelectorAll("[data-auth-close]")),
      modal: document.querySelector("[data-auth-modal]"),
    };
    refs.openAuthModalBtn.forEach(btn => btn.addEventListener("click", toggleModal));
    refs.closeAuthModalBtn.forEach(btn => btn.addEventListener("click", toggleModal));

    function toggleModal() {
      refs.modal.classList.toggle("modal-hidden");
    }

  }

  //----------------------- MOBILE MENU MODAL WINDOW SHOW/HIDE ---------------//

  {

    const menuBtnRef = document.querySelector("[data-menu-button]");
    const mobileMenuRef = document.querySelector("[data-nav-modal]");
    const mobileMenuOpenHandler = function () {
      mobileMenuRef.classList.toggle("modal-hidden");
    }
    const mobileMenuCloseHandler = function () {
      mobileMenuRef.classList.toggle("modal-hidden");
    }

    menuBtnRef.addEventListener("click", mobileMenuOpenHandler);
    mobileMenuRef.addEventListener('click', mobileMenuCloseHandler);

  }

  //----------------------- IMAGE MODAL WINDOW SHOW/HIDE ---------------//

  {
    const modalImgWindowRef = document.querySelector('[data-img-modal]');
    const modalImgRef = document.querySelector('.modal-image');
    function openModalImgHandler(event) {
      const target = event.target;
      if (target.classList.contains('gallery-page-img')) {
        modalImgRef.src = target.dataset.src;
        modalImgWindowRef.classList.toggle('modal-hidden');
      }
    }
    galleryPageRef.addEventListener('click', openModalImgHandler)

  }

  //---------------------------- GALLERY MENU ELEMENTS OPEN/CLOSE HANDLER  ------------------//

  {
    const menuWrapRef = document.querySelectorAll('.menu-item-wrap');
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

  //------------------------------- DAY/NIGHT TOGGLE SWITCH --------------------//

  {
    const nightModeSwitch = document.querySelector('.nightMode-checkbox');
    function nightModeToggle() {
      document.querySelector('body').classList.toggle('light-theme');
    }
    nightModeSwitch.addEventListener('change', nightModeToggle);
  }

  //--------------------------------- GALLERY MENU OPEN/CLOSE SWITCH  ---------------------//

  {
    const sideMenuSwitch = document.querySelector('.sideMenu-checkbox');
    const galleryMenu = document.querySelector('.gallery-menu');
    sideMenuSwitch.addEventListener('change', () => { galleryMenu.classList.toggle('is-hidden') })
  }





