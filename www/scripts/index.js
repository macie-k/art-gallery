var subnav_active = false;
var subnav_animated = false;
const subnav = $('#subnav');

$(window).ready(function(){
    imgMargin();
    // subnav.css('right', -subnav.width());
});

$(window).resize(function(){
    imgMargin();
})

$('.dropdown-menu').click(function() {
    var items = $('.nav-item');
    if(!subnav_active) {
        delay = 0;

        if(!subnav_animated){
            subnav.show(); subnav_animated = true;
            items.each(function(){
                $(this).delay(delay).animate({right: '0px'});
                delay += 70;
            }).promise().done(function(){
                subnav_animated = false;
            });
        }
    } else {
        delay = 0;
        if(!subnav_animated) {
            subnav_animated = true;
            items.each(function(){
                $(this).delay(delay).animate({right: '-100px'});
                delay += 70;
            }).promise().done(function(){
                subnav.hide();
                subnav_animated = false;
            });
        }
    }
    subnav_active = !subnav_active;
});

// $('.dropdown-menu').click(function() {
//     sub_w = subnav.width();
//     if(!subnav_active) {
//         subnav_animated = true;
//         subnav.animate({right: 0}, 300).promise().done(function(){
//             subnav_animated = false;
//         });
//     } else {
//         if(!subnav_animated) {
//             subnav.animate({right: -sub_w}, 300);
//         }
//     }
//     subnav_active = !subnav_active;
// });

/* show & hide menu */
// $('.dropdown-menu').click(function() {
//     const subnav = $('#subnav');
//     if (!subnav_active) {
//         subnav_animated = true;
//         subnav.animate({top: "95px"}, 300).promise().done(function(){
//             subnav.css('z-index', '1');
//             subnav_animated = false;
//         });
//     } else {
//         if(!subnav_animated){
//             subnav.css('z-index', '-1');
//             subnav.animate({top: "-10px"}, 300);
//         }
//     }
//     subnav_active = !subnav_active;
// });

function imgMargin() {
    $('#first img').css('margin-right', ($(window).width() - $('#first img').width())/2);
}

/* disable dragging */
$('img').on('dragstart', function(event) {
    event.preventDefault();
});
