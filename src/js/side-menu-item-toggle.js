/* -------------------------------------------*/
/*  SIDE MENU ITEM OPEN/CLOSE TOGGLE FUNCTION */
/* -------------------------------------------*/

export default function sideMenuItemOpen(event) {
    const menuWrapRef = document.querySelectorAll('.menu-item-wrap');
    if (!event.target.classList.contains('menu-cat-button')) return;
    const targetItem = event.target.nextElementSibling.classList;
    if (!targetItem.contains('isOpen')) {
        menuWrapRef.forEach(item => item.classList.remove('isOpen'));
        targetItem.add('isOpen');
    } else targetItem.remove('isOpen');
};