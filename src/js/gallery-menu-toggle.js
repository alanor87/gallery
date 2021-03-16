/* -------------------------------------------*/
/* ----- GALLERY MENU OPEN'CLOSE TOGGLE ------*/
/* -------------------------------------------*/


import { galleryMenuRef } from "./DOMRefs";
export { galleryMenuToggle };

function galleryMenuToggle() { galleryMenuRef.classList.toggle('isOpen') };