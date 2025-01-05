function language() {
    // The switching of language

    const languagesBtn = document.querySelectorAll(".choose-language__item a");
    const languagesList = document.querySelector(".choose-language__list");
    const languagesMainBtn = document.querySelector(".choose-language__btn");
    const languagesFlags = document.querySelectorAll(".choose-language__btn img");

    function changeLanguage(lang) {
        setLanguageIcon(lang);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    
                    // мне было скучно
                    
                    document.querySelector('.promo__subtitle').innerText = response.promo__subtitle;
                    document.querySelector('.promo__title').innerText = response.promo__title;

                    document.querySelector('.sidepanel__text span').innerText = response.sidepanel__text;
                    document.querySelector('[href="#about"]').innerText = response.menu__about;
                    document.querySelector('[href="#exp"]').innerText = response.menu__exp;
                    document.querySelector('[href="#skills"]').innerText = response.menu__skills;
                    document.querySelector('[href="#portfolio"]').innerText = response.menu__works;
                    document.querySelector('[href="#contacts"]').innerText = response.menu__contacts;
                    
                    document.querySelectorAll('.title.title_fs14')[0].innerText = response.button__portfolio;
                    document.querySelectorAll('.title.title_fs14')[1].innerText = response.button__about;

                    document.querySelector('.title.title_fs16.about__subtitle').innerText = response.menu__about;
                    document.querySelector('.title.title_fs36.about__title').innerText = response.about__title;
                    document.querySelector('.about__description').innerText = response.about__description;
                    document.querySelectorAll('.title.title_fs14.about__item-title')[0].innerText = response.about__item_title;
                    document.querySelectorAll('.about__item-description')[0].innerText = response.about__item_description_0;
                    document.querySelectorAll('.about__item-description')[1].innerText = response.about__item_description_1;
                    document.querySelectorAll('.about__item-description')[2].innerText = response.about__item_description_2;

                    document.querySelector('.title.title_fs16.exp__subtitle').innerText = response.exp__subtitle;
                    document.querySelector('.title.title_fs36.exp__title').innerText = response.exp__title;

                    document.querySelectorAll('.title.title_fs20.exp__column-title')[0].innerText = response.exp__column_title_0;
                    document.querySelectorAll('.title.title_fs20.exp__column-title')[1].innerText = response.exp__column_title_1;
                    document.querySelectorAll('.exp__item-location')[0].innerText = response.exp__item_location_0; 
                    document.querySelectorAll('.exp__item-location')[1].innerText = response.exp__item_location_1; 
                    document.querySelectorAll('.exp__item-location')[2].innerText = response.exp__item_location_2;

                    document.querySelectorAll('.exp__item-body')[0].innerText = response.exp__item_body_0; 
                    document.querySelectorAll('.exp__item-body')[1].innerText = response.exp__item_body_1; 
                    document.querySelectorAll('.exp__item-body')[2].innerText = response.exp__item_body_2;  
                    
                    document.querySelectorAll('.exp__item-subtitle')[0].innerText = response.exp__item_subtitle_0; 
                    document.querySelectorAll('.exp__item-subtitle')[1].innerText = response.exp__item_subtitle_1; 
                    document.querySelectorAll('.exp__item-subtitle')[2].innerText = response.exp__item_subtitle_2;

                    document.querySelector('.skills__title').innerText = response.skills__title;
                    document.querySelector('.skills__subtitle').innerText = response.skills__subtitle;
                    
                    document.querySelectorAll('.skills__item-second-title')[0].innerText = response.skills__item_second_title_0; 
                    document.querySelectorAll('.skills__item-second-title')[1].innerText = response.skills__item_second_title_1; 
                    document.querySelectorAll('.skills__item-second-title')[2].innerText = response.skills__item_second_title_2;  document.querySelectorAll('.exp__item-subtitle')[0].innerText = response.exp__item_subtitle_0; 
                    document.querySelectorAll('.skills__item-second-title')[3].innerText = response.skills__item_second_title_3; 
                    
                    document.querySelector('.portfolio__title').innerText = response.portfolio__title;
                    document.querySelector('.portfolio__subtitle').innerText = response.portfolio__subtitle;

                    document.querySelectorAll('.portfolio__item-text span').forEach(item => {
                        item.innerText = response.portfolio__item_text 
                    });

                    document.querySelector('.contacts__title').innerText = response.contacts__title;
                    document.querySelector('.contacts__subtitle').innerText = response.contacts__subtitle;

                    document.querySelector('.contacts__change').innerText = response.contacts__change;
                    document.querySelector('.contacts__give-data').innerText = response.contacts__give_data;

                    document.querySelectorAll('.contacts__input label')[0].innerText = response.contacts__input_0;
                    document.querySelectorAll('.contacts__input label')[1].innerText = response.contacts__input_1;

                    document.querySelector('.contacts__textarea label').innerText = response.contacts__textarea;

                    document.querySelector('.button.contacts__button').innerText = response.contacts__button;
                    document.querySelector('.contacts__policy a').innerText = response.contacts__policy;
                    document.querySelector('.contacts__policy span').innerText = response.contacts__policy_text;

                } else {
                    console.error('Error: ' + xhr.status);
                }
            }
        };
        xhr.open('GET', 'language.php?lang=' + lang, true);
        xhr.send();
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function setLanguageIcon(nameLanguage) {
        languagesFlags.forEach(item => {
            if (item.dataset.lang === nameLanguage) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        })
    }

    window.addEventListener('load', () => {
        let langCookie = getCookie('lang');
        if (langCookie) {
            changeLanguage(langCookie);
        } else {
            langCookie = "en";
            changeLanguage(langCookie);
        }
    });

    languagesMainBtn.addEventListener("click", (event) => {
        event.preventDefault();
        languagesList.classList.add("choose-language__list_active");
    })

    languagesBtn.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const lang = item.dataset.lang;
            languagesList.classList.remove("choose-language__list_active");
            changeLanguage(lang);
            return false;
        })
    })
}

export default language;