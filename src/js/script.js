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

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const item = document.querySelector('.sidepanel__text');
    const divider = document.querySelector('.sidepanel__divider');
    const linkedin = document.querySelectorAll('.sidepanel .linkedin svg path');
    const inst = document.querySelectorAll('.sidepanel .inst svg path');
    const github = document.querySelectorAll('.sidepanel .github svg path');
    const sectionHeight = window.innerHeight;

    if (scrollPosition > sectionHeight / 2) {
        item.style.color = 'black';
    } else {
        item.style.color = 'white';
    }

    if (scrollPosition > sectionHeight / 2 + 100) {
        divider.style.backgroundColor = 'black';
        fillIcon(github, 'black');
    } else {
        divider.style.backgroundColor = 'white';
        fillIcon(github, 'white');
    }

    if (scrollPosition > sectionHeight / 2 + 200) {
        fillIcon(linkedin, 'black');
        fillIcon(inst, 'black');
    } else {
        fillIcon(linkedin, 'white');
        fillIcon(inst, 'white');
    }

})



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















