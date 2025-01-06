'use strict'

import WOW from 'wowjs';
import form from "./modules/form";
import hamburger from "./modules/hamburger";
import language from "./modules/language";
import sidepanel from "./modules/sidepanel";
import skillsStripes from "./modules/skillsStripes";
import stick from "./modules/stick";
import theme from "./modules/theme";
import movingTechnologies from './modules/movingTechnologies';


window.addEventListener("DOMContentLoaded", () => {

    new WOW.WOW().init();
    // Sending form
    form();

    hamburger();

    language();

    // Adaptive sidepanel, when it is located on the white/blue background
    sidepanel();

    // Animation for skills stripes
    skillsStripes();

    // Add animation to stick in exp section
    stick();

    theme();

    movingTechnologies();
})











































