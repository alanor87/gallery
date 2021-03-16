/* ----------------------------*/
/*  NIGHT MODE TOGGLE FUNCTION */
/* ----------------------------*/
import { bodyRef, nightModeSwitch } from "./DOMRefs";
export { themeLoadHandler, nightModeToggle };

function themeLoadHandler() {
    switch (localStorage.getItem('theme')) {
        case 'light':
            bodyRef.classList.add('light-theme');
            nightModeSwitch.checked = true;
            break;
        case 'dark':
            return;
    }
}

function nightModeToggle() {
    if (bodyRef.classList.contains('light-theme')) {
        bodyRef.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
        return;
    };
    bodyRef.classList.add('light-theme');
    localStorage.setItem('theme', 'light');

};

