import $ from 'jquery';
import { setFlags, isDesktop } from './common';

var lastScrollTop = 0;
var current_scrollTop;
var current_album = 'awarded';

const album_awarded = 'PwSjiCw';
const album_all = 'SSUYPd5';
const albums = {};

const clientID = '084e31407b21fa0';

window.addEventListener('load', async () => {
    $('#content').delay(300).animate({ opacity: 1 }, 1000);
    setFlags(true);

    albums.awarded = await getImages(album_awarded);
    await changeAlbum(current_album);
    albums.all = await getImages(album_all);

    /* wait for images to load and adjust spacing in 2-row view */
    setTimeout(() => {
        adjustColumns();
    }, 400);
});

/* attach click event to photos that change dynamically */
$(document).on('click', '.overlay', function () {
    const $img = $(this).parent().find('.img');
    showPreview($img);
});

$('#preview-background > *, #preview-container > *').click(function (e) {
    e.stopPropagation();
});

/* [X] on preview */
$('#close-icon, #preview-background, #preview-container').click(function () {
    hidePreview();
});

$('.input').on('click keydown keyup input', function () {
    validateInputs();
});

$('.menu-item').on('click', async function () {
    const album = $(this).attr('id').substr(5);
    await changeAlbum(album);
    setTimeout(() => {
        adjustColumns();
    }, 400);
});

$(window).on('resize', function () {
    adjustColumns();
    setPreviewHeight();
    setFlags();

    if (!subnav_active) {
        if (isDesktop()) {
            $('#subnav').fadeIn(600);
            $('#subnav > *').css('right', 'unset');
        }
    } else {
        if (isDesktop()) {
            $('#subnav > *').css('right', 'unset');
        } else {
            $('#subnav > *').css('right', '0');
        }
    }
});

function setPreviewHeight() {
    const $prevContainer = $('#preview-container');
    const $prevImg = $('#preview-img');
    const $formContainer = $('#form-container');

    if ($(document).width() >= 1000) {
        $prevContainer.css('height', $prevImg.height());
    } else {
        $prevContainer.css('height', 'unset');
    }
}

function validateInputs() {
    const email = $('.input').eq(0).val();
    const message = $('.input').eq(1).val();

    if (email != '' && message != '' && isEmail(email)) {
        $('.input[type=submit]').removeAttr('disabled');
    } else {
        $('.input[type=submit]').attr('disabled', true);
    }
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function showPreview($img) {
    const url = $img.attr('src');
    const $container = $('#preview-background');
    const $preview_img = $('#preview-img');
    const $preview_title = $('#preview-img-title');
    const title = $img.attr('data-title') !== 'null' ? $img.attr('data-title') : ' ';

    if ($(document).width() < 1000) {
        $('#navbar').fadeOut(100);
        $('#images').fadeOut(100);
    }

    $container.fadeIn(500);
    $container.css('display', 'flex');
    $('#form-attachment').attr('value', url);
    $preview_img.attr('src', url);
    $preview_title.html(title);

    setPreviewHeight();

    current_scrollTop = $(window).scrollTop();
}

function hidePreview() {
    $('#preview-background').fadeOut(300);
    $('#images').fadeIn(500);
    $('#navbar').fadeIn(100);
    $(window).scrollTop(current_scrollTop);
}

/* download images from api */
async function getImages(album) {
    const result = await fetch(`https://api.imgur.com/3/album/${album}`, {
        headers: {
            Authorization: 'Client-ID ' + clientID,
        },
    });

    if (result.status !== 200) {
        throw new Error('Cannot load imgur album');
    }

    const data = await result.json();
    return data.data;
}

/* change collection [awarded/all] */
async function changeAlbum(albumName) {
    current_album = albumName;
    const album = albums[albumName];

    $(window).scrollTop(0);

    $('.menu-item').removeClass('hovered');
    $(`#menu-${current_album}`).addClass('hovered');
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

        $img.on('load', async function () {
            $(this).css('height', 'auto');
            setTimeout(() => {
                $(this).animate({ opacity: 1 }, 200);
            }, 200);
            setTimeout(() => {
                $(this).parent().css('background-color', '#000');
            }, 1000);
        });

        index = index < 4 ? index + 1 : 1;
    }
}

/* adjust spacing between columns after switching view */
function adjustColumns() {
    $('.column').css('margin-top', 'unset');
    if ($(window).width() < 1200 && $(window).width() > 750) {
        const index = $('#column-1').outerHeight() < $('#column-2').outerHeight() ? 1 : 2;

        const $aboveColumn = $(`#column-${index}`);
        const $changeColumn = $(`#column-${index + 2}`);
        const $referenceColumn = $(`#column-${index === 1 ? 4 : 3}`);

        const aboveColumnTop = $aboveColumn.offset().top;
        const aboveColumnHeight = $aboveColumn.outerHeight();

        var referenceColumnTop = $referenceColumn.offset().top;

        $changeColumn.css('margin-top', aboveColumnTop + aboveColumnHeight - referenceColumnTop);
    }
}

/* hide & show menu on scroll in mobile view */
$(window).on('scroll', function () {
    if (!isDesktop()) {
        var scrollTop = $(this).scrollTop();
        if (Math.abs(scrollTop - lastScrollTop) > 70) {
            if (scrollTop > lastScrollTop) {
                $('#navbar').delay(200).css('top', '-130px');
            } else {
                $('#navbar').css('top', '0px');
            }
            lastScrollTop = scrollTop;
        }
    }
});
