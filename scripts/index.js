var subnav_active = false;
var subnav_animated = false;
var initial_scrolled;

$(document).ready(function(){
    $('#bounce-arrow').data('is-hidden', false);

    if($(window).scrollTop() < "50") {
        initial_scrolled = false;
    } else {
        initial_scrolled = true;
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

$(window).scroll(function(e){
    if(!isDesktop()) {
        if($(window).scrollTop() < "50") {
            initial_scrolled = false;
        }
        if(isVisible('#collection-txt', 200) && !initial_scrolled) {
            $('html').animate({
                scrollTop: $('#collection-txt').offset().top - 50
            }, 500, 'swing');
            initial_scrolled = true;
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
