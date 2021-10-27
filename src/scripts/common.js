import $ from 'jquery';
import { changeLanguage } from './i18n';

import flag_de from '../img/icons/flag_de.svg';
import flag_en from '../img/icons/flag_en.svg';
import flag_pl from '../img/icons/flag_pl.svg';

var currentLang = 'en';
var subnavActive = false;
var subnavAnimated = false;
const flags = {
    pl: flag_pl,
    en: flag_en,
    de: flag_de,
};

window.addEventListener('load', async () => {
    currentLang = navigator.language.substr(0, 2);
    changeLanguage(currentLang);
});

/* change flags position based on a current language */
export function setFlags() {
    const lngs = ['pl', 'en', 'de'];

    if (isDesktop()) {
        const remaining_lngs = lngs.filter(function (e) {
            return e != currentLang;
        });

        $('.flag').eq(0).attr({ src: flags[currentLang], 'data-lang': currentLang });
        $('.flag').eq(1).attr({
            src: flags[remaining_lngs[0]],
            'data-lang': remaining_lngs[0],
        });
        $('.flag').eq(2).attr({
            src: flags[remaining_lngs[1]],
            'data-lang': remaining_lngs[1],
        });
    }
}

/* checking if website is displayed on mobile or desktop */
export function isDesktop() {
    return $(window).width() >= 750;
}

/* disable dragging */
$('img').on('dragstart', function (event) {
    event.preventDefault();
});

/* show menu */
function showSubnav(delay) {
    subnavAnimated = true;
    $('#subnav').fadeIn(500);
    $('#flags').animate({ right: '0px' });

    $('.menu-item')
        .each(function () {
            $(this).delay(delay).animate({ right: '0px' });
            delay += 70;
        })
        .promise()
        .done(function () {
            subnavAnimated = false;
        });

    subnavActive = true;
}

/* hide menu */
function hideSubnav(delay) {
    subnavAnimated = true;
    $('#subnav').fadeOut(500);
    $('#flags').animate({ right: '-130px' });
    $('.menu-item')
        .each(function () {
            $(this).delay(delay).animate({ right: '-130px' });
            delay += 70;
        })
        .promise()
        .done(function () {
            subnavAnimated = false;
        });

    subnavActive = false;
}

/* show & hide menu on click */
$('.dropdown-menu').on('click', function () {
    if (!subnavActive) {
        if (!subnavAnimated) showSubnav(70);
    } else {
        if (!subnavAnimated) hideSubnav(70);
    }
});

/* changing language when flag is clicked */
$('.flag').on('click', async function () {
    currentLang = $(this).attr('data-lang');

    $('#content').fadeOut(500, async function () {
        setFlags();
        changeLanguage(currentLang);
        $(this).fadeIn(500);
    });
});

$(window).on('resize', function () {
    const subItems = $('#subnav > *');
    if (!subnavActive) {
        if (isDesktop()) {
            $('#subnav').fadeIn(600);
            subItems.css('right', 'unset');
        }
    } else {
        if (isDesktop()) {
            subItems.css('right', 'unset');
        } else {
            subItems.css('right', '0');
        }
    }
});
