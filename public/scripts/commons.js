document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.menu-icon');
    const links = document.querySelector('.linkss');

    menuIcon.addEventListener('click', function () {
        links.classList.toggle('show');
    });
});
