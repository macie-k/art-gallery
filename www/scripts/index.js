var subnav_active = false;
var subnav_animated = false;

$(window).ready(function(){
    imgMargin();
});

$(window).resize(function(){
    imgMargin();
})

/* show & hide menu */
$('.dropdown-menu').click(function() {
    const subnav = $('#subnav');
    if (!subnav_active) {
        subnav_animated = true;
        subnav.animate({top: "95px"}, 300).promise().done(function(){
            subnav.css('z-index', '1');
            subnav_animated = false;
        });
    } else {
        if(!subnav_animated){
            subnav.css('z-index', '-1');
            subnav.animate({top: "-10px"}, 300);
        }
    }
    subnav_active = !subnav_active;
});

function imgMargin() {
    $('#first img').css('margin-right', ($(window).width() - $('#first img').width())/2);
}

/* disable dragging */
$('img').on('dragstart', function(event) {
    event.preventDefault();
});
