import en from './en.json';
import fr from './fr.json';
import frA from './fr-CA.json';
import I18n from 'react-native-i18n';
// import * as RNLocalize from "react-native-localize";

// const locales = RNLocalize.getLocales();

// if (Array.isArray(locales)) {
//   I18n.locale = locales[0].languageTag;
// }

I18n.fallbacks = true;
I18n.translations = {
  en,
  fr,
  // frA
};

export const changeLaguage = (languageKey) => {
  I18n.setLanguage(languageKey)
}

export default I18n;