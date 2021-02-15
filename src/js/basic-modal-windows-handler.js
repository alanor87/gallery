/* ------------------------------------------*/
/*  MODAL WINDOW OPEN/CLOSE TRIGGER HANDLERS */
/* ------------------------------------------*/

import { backdropRef } from "./DOMRefs";
import { navToggleHandler } from "./specific-modal-window-handlers";
import { authToggleHandler } from "./specific-modal-window-handlers";
import { imgToggleHandler } from "./specific-modal-window-handlers";
import { uploadToggleHandler } from "./specific-modal-window-handlers";

export function openModal(event) {
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

export function closeModal(event) {
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
