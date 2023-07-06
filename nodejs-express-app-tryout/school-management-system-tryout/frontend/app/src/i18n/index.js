import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import jp from './jp';
import cn from './cn';
import en from './en';
import hk from './hk';
import es from './es';

const resources = {
  en,
  hk,
  es,
  cn,
  jp,
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
