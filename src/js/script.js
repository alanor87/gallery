
import "../sass/main.scss";
import debounce from 'lodash.debounce';
import {inputQueryHandler} from './inputQueryHandler';
import { nightModeToggle, themeLoadHandler } from "./night-mode-toggle.js";
import { sideMenuItemOpen } from "./side-menu-item-toggle";
import { openModal, closeModal } from "./basic-modal-windows-handler";
import { modalImgTriggerHandler } from "./modal-image-nav";
import { galleryMenuToggle } from "./gallery-menu-toggle";
import { nightModeSwitch, intersectionAnchorGalleryRef, searchInput } from "./DOMRefs";
import { infScrollObserver } from "./intersection-observer";

const modalOpenTriggersRef = Array.from(document.querySelectorAll("[data-mod-open-trigger]"));
const modalCloseTriggersRef = Array.from(document.querySelectorAll("[data-mod-close-trigger]"));
const modalImgNav = document.querySelectorAll('.image-nav-arrow');
const menuListItem = document.querySelector('.gallery-menu');
const sideMenuSwitch = document.querySelector('.sideMenu-checkbox');

window.addEventListener('DOMContentLoaded', themeLoadHandler);
nightModeSwitch.addEventListener('change', nightModeToggle);
sideMenuSwitch.addEventListener('change', galleryMenuToggle);
menuListItem.addEventListener('click', sideMenuItemOpen);
modalOpenTriggersRef.forEach(item => item.addEventListener("click", openModal));
modalCloseTriggersRef.forEach(item => item.addEventListener("click", closeModal));
modalImgNav.forEach(item => item.addEventListener("click", modalImgTriggerHandler));
searchInput.addEventListener('input', debounce(inputQueryHandler, 1000));

infScrollObserver.observe(intersectionAnchorGalleryRef);