window.i18n = (function() {
    let translations = null;
  
    async function downloadTranslations() {
      const response = await fetch("./translations.json");
      translations = await response.json();
    }
  
    async function changeLanguage(language) {
      if (translations === null) {
        await downloadTranslations();
      }
      
      if (translations[language] === undefined) {
        language = 'en';
      }
      
      $("[data-key]").each(function() {
        const key = $(this).attr("data-key");
        $(this).html(translations[language][key]);
      });
    }
    
    return {
      changeLanguage,
      downloadTranslations
    };
  })();
  