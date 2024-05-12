const hamburger = document.querySelector('.hamburger');
const close = document.querySelector('.menu__close');
const menu = document.querySelector('.menu');
const menuLink = document.querySelectorAll('.menu__link');
const promoButtons = document.querySelectorAll('.promo__buttons a');


//Hamburger click
hamburger.addEventListener('click', () => {
    menu.classList.add('active');
})

close.addEventListener('click', () => {
    menu.classList.remove('active');
})

//Close menu when the user clicked outside the menu
menu.addEventListener('click', (event) => {
    if (!event.target.classList.contains("menu__block") && menu.classList.contains("active")) {
        menu.classList.remove('active');
    }
})


//Close menu when the user clicked on the link
for (let i = 0; i < menuLink.length; i++) {
    menuLink[i].addEventListener('click', function (e) {
        e.preventDefault();
        menu.classList.remove('active');
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    })
}

//Smooth scroll for promo buttons
for (let i = 0; i < promoButtons.length; i++) {
    promoButtons[i].addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    })
}

//Adaptive sidepanel, when it is located on the white background
function fillIcon(item, color) {
    for (let i = 0; i < item.length; i++) {
        item[i].style.fill = color;
    }
}


const item = document.querySelector('.sidepanel__text');
const divider = document.querySelector('.sidepanel__divider');
const linkedin = document.querySelectorAll('.sidepanel .linkedin svg path');
const inst = document.querySelectorAll('.sidepanel .inst svg path');
const github = document.querySelectorAll('.sidepanel .github svg path');
const githubIcon = document.querySelector('.sidepanel .github');
const instIcon = document.querySelector('.sidepanel .inst');
const linkedinIcon = document.querySelector('.sidepanel .linkedin');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    const sectionHeight = window.innerHeight;

    if (scrollPosition > sectionHeight / 2 && document.body.classList.contains("night-theme")) {
        item.style.color = '#8bb5df';
    } else if (scrollPosition > sectionHeight / 2){
        item.style.color = 'black';
    } else {
        item.style.color = 'white';
    }

    if (scrollPosition > sectionHeight / 2 + 100 && document.body.classList.contains("night-theme")) {
        divider.style.backgroundColor = '#8bb5df';
        fillIcon(github, '#8bb5df');
    } else if (scrollPosition > sectionHeight / 2 + 100) {
        divider.style.backgroundColor = 'black';
        fillIcon(github, 'black');
    }
    else {
        divider.style.backgroundColor = 'white';
        fillIcon(github, 'white');
    }

    if (scrollPosition > sectionHeight / 2 + 200 && document.body.classList.contains("night-theme")) {
        fillIcon(linkedin, '#8bb5df');
        fillIcon(inst, '#8bb5df');
    } else if (scrollPosition > sectionHeight / 2 + 200) {
        fillIcon(linkedin, 'black');
        fillIcon(inst, 'black');
    }
    else {
        fillIcon(linkedin, 'white');
        fillIcon(inst, 'white');
    }

})

//Function for change color because css hover dont work
function changeColorAfterHover(icon, color, name) {
    let prevColor;

    icon.addEventListener('mouseover', () => {
        prevColor = document.querySelectorAll(`.sidepanel .${name} svg path`)[0].style.fill;
        fillIcon(color, 'var(--color-hover)');
    })

    icon.addEventListener('mouseout', () => {
        fillIcon(color, `${prevColor}`);
    })
}

changeColorAfterHover(githubIcon, github, "github");
changeColorAfterHover(instIcon, inst, "inst");
changeColorAfterHover(linkedinIcon, linkedin, "linkedin");



//Animation for skills stripes
window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.skills__stripe-inner');

    for (let i = 0; i < elements.length; i++) {
        const position = elements[i].getBoundingClientRect();

        //Checking element is in the field of view
        if (position.top >= 0 && position.bottom <= window.innerHeight) {

            const width = elements[i].style.width;

            //Unique animation for each element
            const style = document.createElement('style');
            const differentAnimationNameForEachElement = "changeWidth" + i;
            style.innerHTML = `
                @keyframes ${differentAnimationNameForEachElement} {
                    from {
                        width: 0;
                    }
                    to {
                        width: ${width};
                    }
                }
                `;
            document.head.appendChild(style);

            elements[i].style.animationDuration = `1.5s`;
            elements[i].style.animationName = differentAnimationNameForEachElement;

        } else {
            elements[i].style.animationName = '';
        }

    }
});


//Sending form
const myForm = document.getElementById('myForm');
const ansForm = document.getElementById('ansForm')
async function formSend(e){

    const form = e.target;
    let formData = new FormData(form);

    ansForm.innerHTML = 'Загрузка...';

    let response = await fetch('mailer/smart.php', {
        method: 'POST',
        body: formData
    });

    if(response.ok) {
        ansForm.innerHTML = "Ваши данные успешно отправлены!"
        form.reset();
        setTimeout(function(){
            ansForm.innerHTML = ""
        }, 3000)
    } else {
        alert("Ошибка");
        ansForm.innerHTML = ""
    }
}

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSend(e);
})



//Add animation to stick in exp section

const expWrapper = document.querySelector(".exp__wrapper");
expWrapper.style.opacity = "0";

let lowestElement = document.getElementById("lowestElementInExpSection");
let eventHappened = false;
const sticks = document.querySelectorAll(".animation-stick");

function playHorizontalStickAnimations(index) {
    let stickAnimation = document.querySelector(`.exp__item_anim${index}`).animate([
        {width: "0"},
        {width: "45px"},
    ], {
        duration: 250,
        iterations: 1,
        pseudoElement: '::before',
        easing: 'ease-in'
    });
    stickAnimation.play();
    stickAnimation.finished.then(() => {
        let styleForSticksHorizontal = document.createElement('style');
        styleForSticksHorizontal.innerHTML = `
            .exp__item_anim${index}:before {
                width: 45px;
            }
        `;
        document.head.appendChild(styleForSticksHorizontal);
    });
}

function playVerticalStickAnimations(index, indicator) {
    if (index >= sticks.length && indicator === "experience") return; // Если достигнут конец массива, выходим из функции
    if (index >= sticks.length / 2 && indicator === "education") return;
    sticks[index].style.opacity = "1";

    let stickAnimation = sticks[index].animate([
        {height: "0"},
        {height: "calc(100% + 16px)"},
    ], {
        duration: 500,
        iterations: 1,
        pseudoElement: '::after',
        easing: 'ease-in'
    });

    stickAnimation.finished.then(() => {
        playHorizontalStickAnimations(index + 1);
        playVerticalStickAnimations(index + 1, indicator); // Рекурсивно запускаем следующую анимацию после завершения текущей
    });
}

window.addEventListener("scroll", () => {
    let currentPositionLowestElement = lowestElement.getBoundingClientRect();

    if (currentPositionLowestElement.bottom <= window.innerHeight && !eventHappened) {

        document.querySelectorAll(".exp__item-header").forEach(item => {
            item.classList.add("animate__animated");
        })
        document.querySelectorAll(".exp__item-body").forEach(item => {
            item.classList.add("animate__animated");
        })

        eventHappened = true;

        sticks.forEach(item => {
            item.style.opacity = "0";
        })
        expWrapper.style.opacity = "1";
        setTimeout(() => {
            playVerticalStickAnimations(0, "education");
            playVerticalStickAnimations(2, "experience");
        }, 950);
    }

})


//Switch to theme
const theme = document.querySelector(".night-theme");
const switchBtn = document.querySelector(".switch");
const root = document.documentElement;



function setTheme(themeName) {
    if (themeName === "night") {
        localStorage.setItem("theme", themeName);
        theme.classList.add("night-theme");
        document.getElementById('slider').checked = false;
        root.style.setProperty('--color-main', '#617e9d');
    } else {
        localStorage.setItem("theme", themeName);
        theme.classList.remove("night-theme");
        document.getElementById('slider').checked = true;
        root.style.setProperty('--color-main', '#68a0de');
    }
}
function toggleTheme() {
    if (localStorage.getItem("theme") === "night") {
        setTheme("light");
    } else if (localStorage.getItem("theme") === "light") {
        setTheme("night");
    }
}


if (localStorage.getItem("theme") !== null){
    setTheme(localStorage.getItem("theme"));
} else {
    setTheme("night");
}

switchBtn.addEventListener("change", () => {
    toggleTheme();
})





















