function sidepanel() {

    const item = document.querySelector('.sidepanel__text');
    const divider = document.querySelector('.sidepanel__divider');
    const linkedin = document.querySelectorAll('.sidepanel .linkedin svg path');
    const inst = document.querySelectorAll('.sidepanel .inst svg path');
    const github = document.querySelectorAll('.sidepanel .github svg path');
    const githubIcon = document.querySelector('.sidepanel .github');
    const instIcon = document.querySelector('.sidepanel .inst');
    const linkedinIcon = document.querySelector('.sidepanel .linkedin');

    function fillIcon(item, color) {
        for (let i = 0; i < item.length; i++) {
            item[i].style.fill = color;
        }
    }

    // Function for change color because css hover dont work
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
}

export default sidepanel;