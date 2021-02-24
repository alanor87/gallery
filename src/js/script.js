
import "../sass/main.scss";
import imagesObjArray from "./imagesArray.js";
import galleryImgRender from "./gallery-render.js";
import nightModeToggle from "./night-mode-toggle.js";
import sideMenuItemOpen from "./side-menu-item-toggle";
import { openModal } from "./basic-modal-windows-handler";
import { closeModal } from "./basic-modal-windows-handler";
import { modalImgTriggerHandler } from "./modal-image-nav";
import galleryMenuToggle from "./gallery-menu-toggle";

const modalOpenTriggersRef = Array.from(document.querySelectorAll("[data-mod-open-trigger]"));
const modalCloseTriggersRef = Array.from(document.querySelectorAll("[data-mod-close-trigger]"));
const modalImgNav = document.querySelectorAll('.image-nav-arrow');
const menuListItem = document.querySelector('.gallery-menu');
const nightModeSwitch = document.querySelector('.nightMode-checkbox');
const sideMenuSwitch = document.querySelector('.sideMenu-checkbox');



galleryImgRender(imagesObjArray);

nightModeSwitch.addEventListener('change', nightModeToggle);
sideMenuSwitch.addEventListener('change', galleryMenuToggle);
menuListItem.addEventListener('click', sideMenuItemOpen);
modalOpenTriggersRef.forEach(item => item.addEventListener("click", openModal));
modalCloseTriggersRef.forEach(item => item.addEventListener("click", closeModal));
modalImgNav.forEach(item => item.addEventListener("click", modalImgTriggerHandler));