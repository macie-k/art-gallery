var subnav_active = false;
var subnav_animated = false;

var current_lang;
const imgPath = 'img/icons/';
const lngs = ['pl', 'en', 'de'];
const clientID = '084e31407b21fa0';

$(window).on('load', async function(){
    const album = await getImages();
    changeAlbum(album);


});

$(document).ready(async function() {
    current_lang = navigator.language.substr(0, 2);

    $("#content").delay(300).animate({ opacity: 1 }, 1000);
    setFlags(true);

    await window.i18n.downloadTranslations();
    await window.i18n.changeLanguage(current_lang);
});

$(window).resize(function(){
    if(!subnav_active) {
        if(isDesktop()) {
            $('#subnav').fadeIn(600);
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
});

/* changing language when flag is clicked */
$('.flag').click(async function() {
    current_lang = $(this).attr('data-lang');

    $('#content').fadeOut(500, async function(){
        setFlags();
        await window.i18n.changeLanguage(current_lang);
        $(this).fadeIn(500);
    });
});

/* show & hide menu on click */
$('.dropdown-menu').click(function() {
    if(!subnav_active) {
        if(!subnav_animated) showSubnav(70);
    } else {
        if(!subnav_animated) hideSubnav(70);
    }
});

async function getImages() {
    const result = await fetch(`https://api.imgur.com/3/album/SSUYPd5`, {
        headers: {
            "Authorization": "Client-ID " + clientID,
        }       
    });

    if (result.status !== 200) {
        throw new Error('Cannot load imgur album');
    }

    const data = await result.json();
    return data.data;
}

async function changeAlbum(album) {
    const $container = $('#images');
    $(window).scrollTop(0);

    $('.column').find('div').remove();

    var index = 1;
    for (let image of album.images) {
        const thumbUrl = `https://i.imgur.com/${image.id}l.jpg`;
        const title = image.description;

        const $column = $(`#column-${index}`);
        const $outerDiv = $('<div class="outer-div">').appendTo($column);

        const $overlay = $('<div class="overlay">').appendTo($outerDiv);

        const $img = $(
          `<img
              class="img"
              loading=lazy
              src="${thumbUrl}"
              data-title="${title}">
          `
        ).appendTo($outerDiv);

        const $title = $('<div class="img-title">').appendTo($overlay);
        $title.html(title);

        $img.on('load', async function() {
            setTimeout(() => {
                $(this).animate({opacity: 1}, 200);
            }, 200);
            setTimeout(() => {
                $(this).parent().css('background-color', '#000');
            }, 1000);
        });

        index = (index < 4) ? index+1 : 1;
    }
}

/* show menu */
function showSubnav(delay) {
    subnav_animated = true;

    $('#subnav').fadeIn(500);
    $('#flags').animate({right: '0px'});

    ($('.menu-item')).each(function(){
        $(this).delay(delay).animate({right: '0px'});
        delay += 70;
    }).promise().done(function(){
        subnav_animated = false;
    });

    subnav_active = true;
}

/* hide menu */
function hideSubnav(delay) {
    subnav_animated = true;

    $('#subnav').fadeOut(500);
    $('#flags').animate({right: '-130px'});

    $('.menu-item').each(function(){
        $(this).delay(delay).animate({right: '-130px'});
        delay += 70;
    }).promise().done(function(){
        subnav_animated = false;
    });

    subnav_active = false;
}

/* change flags position based on a current language */
function setFlags(init=false) {
    if(isDesktop() || init) {
        var remaining_lngs = lngs.filter(function(e){
            return e != current_lang;
        });    
        $('.flag').eq(0).attr({'src': `${imgPath}flag_${current_lang}.svg`, 'data-lang': current_lang});
        $('.flag').eq(1).attr({'src': `${imgPath}flag_${remaining_lngs[0]}.svg`, 'data-lang': remaining_lngs[0]});
        $('.flag').eq(2).attr({'src': `${imgPath}flag_${remaining_lngs[1]}.svg`, 'data-lang': remaining_lngs[1]});
    }
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
