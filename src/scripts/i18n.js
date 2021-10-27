import $ from 'jquery';
import translations from '../translations.json';

export function changeLanguage(language) {
    if (translations[language] === undefined) {
        language = 'en';
    }

    $('[data-key]').each(function () {
        const key = $(this).attr('data-key');
        $(this).html(translations[language][key]);
    });
}
