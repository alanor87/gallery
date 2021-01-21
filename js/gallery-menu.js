const menuWrapRef = document.querySelectorAll('.menu-item-wrap');
const menuListItem = Array.from(document.querySelectorAll('.menu-cat-button'));

function menuItemOpen(event) {
    const targetItem = event.target.nextElementSibling.classList;
    if (!targetItem.contains('isOpen')) {
        menuWrapRef.forEach(item => item.classList.remove('isOpen'));
        targetItem.add('isOpen');
    } else {
        targetItem.remove('isOpen');
    }
};

menuListItem.forEach(item => item.addEventListener('click', menuItemOpen));