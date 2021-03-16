/* -------------------------------------------*/
/*  SIDE MENU ITEM OPEN/CLOSE TOGGLE FUNCTION */
/* -------------------------------------------*/

import { menuWrapRef } from "./DOMRefs";
export { sideMenuItemOpen };

 function sideMenuItemOpen(event) {
    if (!event.target.classList.contains('menu-cat-button')) return;
    const targetItem = event.target.nextElementSibling.classList;
    if (!targetItem.contains('isOpen')) {
        menuWrapRef.forEach(item => item.classList.remove('isOpen'));
        targetItem.add('isOpen');
    } else targetItem.remove('isOpen');
};