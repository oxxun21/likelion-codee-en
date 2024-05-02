export const loadGoogleTranslate = (
  setTranslateWidgetLoaded: React.Dispatch<React.SetStateAction<boolean>>,
  setCookie: any,
  refreshTranslateElement: (langCode: string) => void,
  translateElementId: string
): void => {
  const scriptId = "google-translate-script";
  if (!document.getElementById(scriptId)) {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "ko",
          includedLanguages: "ko,en",
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        translateElementId
      );
      setTranslateWidgetLoaded(true);
      setCookie("googtrans", "/ko/en", { path: "/" });
      refreshTranslateElement("en");
    };

    script.onload = () => setTranslateWidgetLoaded(true);
    script.onerror = () => setTranslateWidgetLoaded(false);
  }
};

export const refreshTranslateElement = (langCode: string) => {
  const gtcombo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
  if (gtcombo && gtcombo.value !== langCode) {
    gtcombo.value = langCode;
    gtcombo.dispatchEvent(new Event("change"));
  }
};
