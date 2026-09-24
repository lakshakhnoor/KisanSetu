import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, TRANSLATIONS, TranslationStrings, LanguageOption } from '../data/translations';
import { getPhraseTranslation } from '../data/phraseTranslations';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  currentLangInfo: LanguageOption;
  t: TranslationStrings;
  tr: (text: string) => string;
  availableLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    return localStorage.getItem('kisansetu_lang') || 'en';
  });

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem('kisansetu_lang', code);
  };

  const currentLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  const t: TranslationStrings = {
    ...TRANSLATIONS['en'],
    ...(TRANSLATIONS[currentLanguage] || {})
  };

  const tr = (text: string): string => {
    return getPhraseTranslation(text, currentLanguage);
  };

  // Automatic whole-page text translation observer for complete Indic localization
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const originalTexts = new WeakMap<Node, string>();
    const translatedTexts = new WeakMap<Node, string>();
    let isTranslating = false;

    const translateNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const val = node.nodeValue;
        if (!val || !val.trim()) return;

        const parent = node.parentElement;
        if (!parent) return;
        const tag = parent.tagName.toUpperCase();
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE' || tag === 'INPUT' || tag === 'TEXTAREA') {
          return;
        }

        const trimmed = val.trim();
        let original = originalTexts.get(node);
        if (!original) {
          original = trimmed;
          originalTexts.set(node, original);
        }

        if (currentLanguage === 'en') {
          if (node.nodeValue !== original) {
            translatedTexts.delete(node);
            node.nodeValue = original;
          }
          return;
        }

        const translated = getPhraseTranslation(original, currentLanguage);
        if (translated && translated !== original) {
          const newFullVal = val.replace(trimmed, translated);
          if (node.nodeValue !== newFullVal) {
            translatedTexts.set(node, newFullVal);
            node.nodeValue = newFullVal;
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        if (el.title) {
          const trTitle = getPhraseTranslation(el.title, currentLanguage);
          if (trTitle) el.title = trTitle;
        }
        if (el instanceof HTMLInputElement && el.placeholder) {
          const trPlaceholder = getPhraseTranslation(el.placeholder, currentLanguage);
          if (trPlaceholder) el.placeholder = trPlaceholder;
        }

        for (let i = 0; i < el.childNodes.length; i++) {
          translateNode(el.childNodes[i]);
        }
      }
    };

    const root = document.getElementById('root') || document.body;
    translateNode(root);

    const observer = new MutationObserver((mutations) => {
      if (isTranslating) return;
      isTranslating = true;
      try {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((n) => translateNode(n));
          } else if (mutation.type === 'characterData') {
            if (translatedTexts.get(mutation.target) !== mutation.target.nodeValue) {
              translateNode(mutation.target);
            }
          }
        }
      } finally {
        isTranslating = false;
      }
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => {
      observer.disconnect();
    };
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage,
        currentLangInfo,
        t,
        tr,
        availableLanguages: SUPPORTED_LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

