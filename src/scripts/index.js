import $ from 'jquery';
import { setFlags, isDesktop } from './common';

var menuScroll = false;

window.addEventListener('load', async () => {
    setFlags();
    resizing();

    $('#content').delay(300).animate({ opacity: 1 }, 1000);
    $('#bounce-arrow').data('is-hidden', false);
});

$(window).on('resize', resizing);

$(window).on('click', function () {
    const arrow = $('#bounce-arrow');
    if (arrow.data('is-hidden') === true && $(window).scrollTop() === 0) {
        arrow.data('is-hidden', false);
        arrow.animate({ opacity: 1 });
    } else if (arrow.data('is-hidden') === false) {
        arrow.data('is-hidden', true);
        arrow.animate({ opacity: 0 });
    }
});

/* scroll website when the arrow is clicked */
$('#bounce-arrow').on('click', function () {
    menuScroll = true;
    $('html')
        .animate(
            {
                scrollTop: $('#collection-txt').offset().top - 50,
            },
            500,
            'swing'
        )
        .promise()
        .done(function () {
            menuScroll = false;
        });
});

/* resizing math */
function resizing() {
    if (isDesktop()) {
        $('#intro-content').height($('#intro-img').height() + 200);
        $('#author').css(
            'right',
            $('#intro-img').width() + 0.15 * $(window).width() - 0.15 * $('#intro-img').width() + 10
        );
    } else {
        $('#intro-content').css('height', 'auto');
        $('#bounce-arrow').css('visibillity', 'hidden');
    }
}
