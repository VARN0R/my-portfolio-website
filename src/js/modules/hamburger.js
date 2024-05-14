function hamburger() {
    const hamburger = document.querySelector('.hamburger');
    const close = document.querySelector('.menu__close');
    const menu = document.querySelector('.menu');
    const menuLink = document.querySelectorAll('.menu__link');
    const promoButtons = document.querySelectorAll('.promo__buttons a');

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    })

    close.addEventListener('click', () => {
        menu.classList.remove('active');
    })

// Close menu when the user clicked outside the menu
    menu.addEventListener('click', (event) => {
        if (!event.target.classList.contains("menu__block") && menu.classList.contains("active")) {
            menu.classList.remove('active');
        }
    })


// Close menu when the user clicked on the link
    for (let i = 0; i < menuLink.length; i++) {
        menuLink[i].addEventListener('click', function (e) {
            e.preventDefault();
            menu.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        })
    }

// Smooth scroll for promo buttons
    for (let i = 0; i < promoButtons.length; i++) {
        promoButtons[i].addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        })
    }
}

export default hamburger;