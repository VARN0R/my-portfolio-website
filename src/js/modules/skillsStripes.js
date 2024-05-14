function skillsStripes() {
    const elements = document.querySelectorAll('.skills__stripe-inner');

    window.addEventListener('scroll', function () {
        for (let i = 0; i < elements.length; i++) {
            const position = elements[i].getBoundingClientRect();

            // Checking element is in the field of view
            if (position.top >= 0 && position.bottom <= window.innerHeight) {
                const width = elements[i].style.width;

                // Unique animation for each element
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
}

export default skillsStripes;