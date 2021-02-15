/* ------------------------------------------*/
/*  MODAL WINDOW OPEN/CLOSE TRIGGER HANDLERS */
/* ------------------------------------------*/

export function openModal(event) {
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

export function closeModal(event) {
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

export function navToggleHandler() {
    modalNavRef.classList.toggle("modal-hidden");
};
export function authToggleHandler() {
    modalAuthRef.classList.toggle("modal-hidden");
};
export function uploadToggleHandler() {
    modalUploadRef.classList.toggle("modal-hidden");
};
export function imgToggleHandler(event) {
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

export function modalImageNav(indexShift) {
    const currentIndex = Number(modalImgRef.dataset.index);
    const nextIndex = currentIndex + indexShift;
    if (nextIndex < 0 || nextIndex >= imagesObjArray.length) return;
    modalImgRef.src = `https://picsum.photos/id/${imagesObjArray[nextIndex].id}/1000`;
    modalImgRef.dataset.index = nextIndex;
}

export function modalImgTriggerHandler(event) {
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