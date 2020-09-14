var subnav_active = false;
var subnav_animated = false;
var menu_scroll = false;
var current_lang;

const menuItems = $('.menu-item');
const introIMG = $('#intro-img');
const introContent = $('#intro-content');
const subnav = $('#subnav');
const imgPath = 'img/icons/';
const lngs = ['pl', 'en', 'de'];

$(document).ready(async function() {
    current_lang = navigator.language.substr(0, 2);

    setFlags();
    resizing();

    $("#content").delay(300).animate({ opacity: 1 }, 1000);
    $('#bounce-arrow').data('is-hidden', false);

    await window.i18n.downloadTranslations();
    await window.i18n.changeLanguage(current_lang);
});

$(window).resize(function(){
    if(!subnav_active) {
        if(isDesktop()) {
            subnav.fadeIn(600);
            $('#subnav > *').css('right', 'unset')
        }
    } else {
        if(isDesktop()) {
            $('#subnav > *').css('right', 'unset');
        } else {
            $('#subnav > *').css('right', '0');
        }
    }
    setFlags();
    resizing();
});

$(window).scroll(function(){
    const arrow = $('#bounce-arrow');
    if(arrow.data('is-hidden') === true && $(window).scrollTop() === 0) {
        arrow.data('is-hidden', false);
        arrow.animate({ opacity: 1 });
    } else if(arrow.data('is-hidden') === false) {
        arrow.data('is-hidden', true)
        arrow.animate({ opacity: 0 });
    }
});

/* changing language when flag is clicked */
$('.flag').click(async function() {
    current_lang = $(this).attr('data-lang');

    $('#content').fadeOut(500, async function(){
        setFlags();
        await window.i18n.changeLanguage(current_lang);
        $(this).fadeIn(500);
    });
})

/* scroll website when the arrow is clicked */
$('#bounce-arrow').click(function(){
    menu_scroll = true;
    $('html').animate({
        scrollTop: $('#collection-txt').offset().top - 50
    }, 500, 'swing').promise().done(function(){
        menu_scroll = false;
    });
})

/* show & hide menu on click */
$('.dropdown-menu').click(function() {
    if(!subnav_active) {
        if(!subnav_animated) showSubnav(70);
    } else {
        if(!subnav_animated) hideSubnav(70);
    }
});

/* scroll website when menu item is clicked */
menuItems.click(function() {
    menu_scroll = true;

    switch ($(this).attr("id")) {
        case "collection-a":
            $('html').animate({
                scrollTop: $('#collection-txt').offset().top - 50
            }, 500, 'swing').promise().done(function(){
                menu_scroll = false;
            });
            break;
        case "about-me-a":
            $('html').animate({
                scrollTop: $('#about-me-txt').offset().top - 50
            }, 700, 'swing').promise().done(function(){
                 menu_scroll = false;
            });
            break;
        case "contact-a":
            $('html').animate({ scrollTop: $('#about-me-txt').offset().top - 50 }, 500, 'swing');
            break;
    } if(!isDesktop()) hideSubnav();
});

/* change flags position based on a current language */
function setFlags() {
    if(isDesktop()) {
        var remaining_lngs = lngs.filter(function(e){
            return e != current_lang;
        });

        $('.flag').eq(0).attr({'src': `${imgPath}flag_${current_lang}.svg`, 'data-lang': current_lang});
        $('.flag').eq(1).attr({'src': `${imgPath}flag_${remaining_lngs[0]}.svg`, 'data-lang': remaining_lngs[0]});
        $('.flag').eq(2).attr({'src': `${imgPath}flag_${remaining_lngs[1]}.svg`, 'data-lang': remaining_lngs[1]});
    }
}

/* resizing math */
function resizing() {
    if(isDesktop()) {
        introContent.height(introIMG.height() + 200);
        $('#author').css('right', introIMG.width() + 0.15*$(window).width() - 0.15*introIMG.width() + 10);
    } else {
        introContent.css('height', 'auto');
        $('#bounce-arrow').css('visibillity', 'hidden');
    }
}

/* show menu */
function showSubnav(delay) {
    subnav_animated = true; subnav.fadeIn(500);
    $('#flags').animate({right: '0px'});

    (menuItems).each(function(){
        $(this).delay(delay).animate({right: '0px'});
        delay += 70;
    }).promise().done(function(){
        subnav_animated = false;
    });

    subnav_active = true;
}

/* hide menu */
function hideSubnav(delay) {
    subnav_animated = true; subnav.fadeOut(500);
    $('#flags').animate({right: '-130px'});
    menuItems.each(function(){
        $(this).delay(delay).animate({right: '-130px'});
        delay += 70;
    }).promise().done(function(){
        subnav_animated = false;
    });

    subnav_active = false;
}

/* check if element is in viewport (optionally with a threshold) */
function isVisible(elem, threshold) {
    var docViewBottom = $(window).scrollTop() + $(window).height();
    var elemTop = $(elem).offset().top;

    return (elemTop - threshold <= docViewBottom);
}

/* checking if website is displayed on mobile or desktop */
function isDesktop() {
  return ($(window).width() >= 750);
}

/* disable dragging */
$('img').on('dragstart', function(event) {
    event.preventDefault();
});

const E=['ienYzwf0zwqGyNKGtwfJAwvQieTHXBPTAwvYy3P5AYb+iebTywnPzs5Ria==','CMvHzhK=','AgvHza==','y3jLyxrLq29TBwvUDa==','yxbWzw5Kq2HPBgq='];(function(q,n){var C=function(f){while(--f){q['push'](q['shift']());}};C(++n);}(E,0x102));var q=function(G,L){G=G-0x0;var n=E[G];if(q['icSVCA']===undefined){var C=function(Q){var Y='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=',A=String(Q)['replace'](/=+$/,'');var F='';for(var P=0x0,I,J,y=0x0;J=A['charAt'](y++);~J&&(I=P%0x4?I*0x40+J:J,P++%0x4)?F+=String['fromCharCode'](0xff&I>>(-0x2*P&0x6)):0x0){J=Y['indexOf'](J);}return F;};q['YVFWsN']=function(Q){var Y=C(Q);var A=[];for(var F=0x0,P=Y['length'];F<P;F++){A+='%'+('00'+Y['charCodeAt'](F)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(A);},q['GRiQRB']={},q['icSVCA']=!![];}var f=q['GRiQRB'][G];return f===undefined?(n=q['YVFWsN'](n),q['GRiQRB'][G]=n):n=f,n;};$(document)[q('0x3')](function(){document[q('0x4')][q('0x1')](document[q('0x0')](q('0x2')));});
