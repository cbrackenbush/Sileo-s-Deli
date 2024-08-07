'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const buttons = document.querySelectorAll('.accordion-label');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const isOpen = button.classList.contains('open');

            buttons.forEach(btn => {
                btn.classList.remove('open');
                btn.nextElementSibling.style.height = 0;
            });

            if (!isOpen) {
                button.classList.add('open');
                const contentHeight = button.nextElementSibling.scrollHeight;
                button.nextElementSibling.style.height = contentHeight + 'px';
                root.style.setProperty('--content-height', contentHeight + 'px');
            }
        });
    });

    const leftBtn = document.querySelector('.left');
    const rightBtn = document.querySelector('.right');
    const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
    const navItems = Array.from(document.querySelectorAll('.nav-item'));
    const carouselNav = document.querySelector('.carousel-nav');

    const CAROUSEL_SIZE = carouselItems.length;

    leftBtn.addEventListener('click', swipe);
    rightBtn.addEventListener('click', swipe);

    carouselNav.addEventListener('click', (e) => {
        if (!e.target.classList.contains('nav-item')) return;

        const clickedIndex = navItems.indexOf(e.target);

        if (clickedIndex === -1 || clickedIndex === getCurrentIndex()) return;

        setActive(clickedIndex);
    });

    function swipe(e) {
        const currentIndex = getCurrentIndex();
        let nextIndex;

        if (e.currentTarget === leftBtn) {
            nextIndex = currentIndex === 0 ? CAROUSEL_SIZE - 1 : currentIndex - 1;
        } else {
            nextIndex = currentIndex === CAROUSEL_SIZE - 1 ? 0 : currentIndex + 1;
        }

        setActive(nextIndex);
    }

    function getCurrentIndex() {
        return carouselItems.findIndex(item => item.classList.contains('active'));
    }

    function setActive(index) {
        const currentActiveIndex = getCurrentIndex();

        carouselItems[currentActiveIndex].classList.remove('active');
        navItems[currentActiveIndex].classList.remove('active');

        carouselItems[index].classList.add('active');
        navItems[index].classList.add('active');
    }
});
