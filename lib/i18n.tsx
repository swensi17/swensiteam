import React, { createContext, useContext, useState } from 'react';
import { en } from './translations/en';
import { ru } from './translations/ru';
import { uz } from './translations/uz';

const translations: Record<string, Record<string, string>> = { en, ru, uz };

type LangContextType = {
  lang: string;
  setLang: (l: string) => void;
  t: (key: string) => string;
};

const LangContext = createContext<LangContextType>({
  lang: 'ru',
  setLang: () => {},
  t: (k) => k,
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState(() => localStorage.getItem('lang') || 'ru');
  const setLang = (l: string) => { setLangState(l); localStorage.setItem('lang', l); };
  const t = (key: string) => translations[lang]?.[key] || translations.en[key] || key;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
