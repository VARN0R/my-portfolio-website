function stick() {
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
}

export default stick;