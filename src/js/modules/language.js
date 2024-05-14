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
                    document.querySelector('.promo__subtitle').innerText = response.promo__subtitle;
                    document.querySelector('.promo__title').innerText = response.promo__title;
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