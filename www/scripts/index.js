var subnav_active = false;
var subnav_animated = false;

$(document).ready(function(){
    imgMargin();
    if(isDesktop()) {
        $('#intro-content').height($('#intro img').height() + 200);
        $('#intro').height($(window).height() - $('#navbar').height());
    }
});

$(window).resize(function(){
    imgMargin();
    if(!subnav_active) {
        if(isDesktop()) {
            $('#subnav').fadeIn(600);
            $('.nav-item').css('right', '0');
        } else $('.nav-item').css('right', '-100px');
    }
    if(isDesktop()) {
        $('#intro-content').height($('#intro img').height() + 200);
        $('#intro').height($(window).height() - $('#navbar').height());
    }
})

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

/* checking if website is displayed on mobile or desktop */
function isDesktop() {
  return ($(window).width() >= 700);
}

function imgMargin() {
    $('#first img').css('margin-right', ($(window).width() - $('#first img').width())/2);
}

/* disable dragging */
$('img').on('dragstart', function(event) {
    event.preventDefault();
});
