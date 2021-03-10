const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const handlerMenu = (event) => {
        const target = event.target;
        if (menu.classList.contains('active-menu')) {
            if (target.closest('a') || target.closest('main')) {
                menu.classList.toggle('active-menu');
            }
        } else if (!menu.classList.contains('active-menu')) {
            if (target.closest('.menu')) {
                menu.classList.toggle('active-menu');
            }
        }
    };
    window.addEventListener('click', handlerMenu);

};

export default toggleMenu;