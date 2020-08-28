var subnav_active = false;
var subnav_animated = false;
var menu_scroll = false;
var initial_scroll = false;

$(document).ready(function(){
    $('#bounce-arrow').data('is-hidden', false);

    if($(window).scrollTop() < "50") {
        initial_scroll = false;
    } else {
        initial_scroll = true;
    }
    if(isDesktop()) {
        $('#intro-content').height($('#intro img').height() + 200);
    }
});

$(window).resize(function(){
    if(!subnav_active) {
        if(isDesktop()) {
            $('#subnav').fadeIn(600);
            $('.nav-item').css('right', '0');
        } else $('.nav-item').css('right', '-100px');
    }
    if(isDesktop()) {
        $('#intro-content').height($('#intro-img').height() + 200);
    } else {
        $('#bounce-arrow').css('visibillity', 'hidden');
    }
})

$(window).scroll(function(){
    if(!isDesktop()) {
        if($(window).scrollTop() < "50") {
            initial_scroll = false;
        }
        if(isVisible('#collection-txt', 200) && !initial_scroll) {
            if(!menu_scroll) {
                $('html').stop(true, false).animate({
                    scrollTop: $('#collection-txt').offset().top - 50
                }, 500, 'swing');
            } initial_scroll = true;
        }
    } else {
        const arrow = $('#bounce-arrow');

        if(arrow.data('is-hidden') === true && $(window).scrollTop() === 0) {
          arrow.data('is-hidden', false);
          arrow.animate({ opacity: 1 });
        } else if(arrow.data('is-hidden') === false) {
          arrow.data('is-hidden', true)
          arrow.animate({ opacity: 0 });
        }
    }
});

const subnav = $('#subnav');
const subnav_items = $('.nav-item');

/* show & hide menu on click */
$('.dropdown-menu').click(function() {
    if(!subnav_active) {
        if(!subnav_animated) showSubnav(0);
    } else {
        if(!subnav_animated) hideSubnav(0);
    }
});

$('.nav-item').click(function() {
    menu_scroll = true;  initial_scroll = true;

    switch ($(this).attr("id")) {
        case "collection-a":
            $('html').animate({
                scrollTop: $('#collection-txt').offset().top - 50
            }, 500, 'swing').promise().done(function(){
                console.log('cumm');
                menu_scroll = false;
            });
            break;
        case "about-me-a":
            $('html').animate({
                scrollTop: $('#about-me-txt').offset().top - 50
            }, 500, 'swing').promise().done(function(){
                 menu_scroll = false;
            });
            break;
        case "contact-a":
            $('html').animate({ scrollTop: $('#about-me-txt').offset().top - 50 }, 500, 'swing');
            break;
    } hideSubnav(100);
});

/* show menu */
function showSubnav(delay) {
    subnav_animated = true; subnav.fadeIn(500);

    subnav_items.each(function(){
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

    subnav_items.each(function(){
        $(this).delay(delay).animate({right: '-100px'});
        delay += 70;
    }).promise().done(function(){
        subnav_animated = false;
    });

    subnav_active = false;
}

function isVisible(elem, threshold) {
    var docViewBottom = $(window).scrollTop() + $(window).height();
    var elemTop = $(elem).offset().top;

    return (elemTop - threshold <= docViewBottom);
}

/* checking if website is displayed on mobile or desktop */
function isDesktop() {
  return ($(window).width() >= 700);
}

/* disable dragging */
$('img').on('dragstart', function(event) {
    event.preventDefault();
});

$(document).ready(function() {
  document.head.appendChild(document.createComment(" Created by Maciej Kaźmierczyk ~ @macie.k "));
});
