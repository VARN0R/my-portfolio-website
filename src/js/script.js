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

for (let i = 0; i < menuLink.length; i++){
    menuLink[i].addEventListener('click', function(e){
        e.preventDefault();
        menu.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    })
}

for (let i = 0; i < promoButtons.length; i++){
    promoButtons[i].addEventListener('click', function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    })
}

function fillIcon(item, color) {
    for (let i = 0; i < item.length; i++){
        item[i].style.fill = color;
    }
}
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const item = document.querySelector('.sidepanel__text');
    const divider = document.querySelector('.sidepanel__divider');
    const linkedin = document.querySelectorAll('.sidepanel .linkedin svg path');
    const inst = document.querySelectorAll('.sidepanel .inst svg path');
    const github = document.querySelectorAll('.sidepanel .github svg path');
    const sectionHeight = window.innerHeight;

    if (scrollPosition > sectionHeight/2) {
        item.style.color = 'black';
    }
    else {
        item.style.color = 'white';
    }

    if (scrollPosition > sectionHeight/2 + 100) {
        divider.style.backgroundColor = 'black';
        fillIcon(github, 'black');
    }
    else {
        divider.style.backgroundColor = 'white';
        fillIcon(github, 'white');
    }

    if (scrollPosition > sectionHeight/2 + 200) {
        fillIcon(linkedin, 'black');
        fillIcon(inst, 'black');
    }
    else {
        fillIcon(linkedin, 'white');
        fillIcon(inst, 'white');
    }

})





