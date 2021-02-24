/* -------------------------------------------*/
/* ----- GALLERY MENU OPEN'CLOSE TOGGLE ------*/
/* -------------------------------------------*/


import { galleryMenuRef } from "./DOMRefs";

export default function galleryMenuToggle() { galleryMenuRef.classList.toggle('isOpen') }