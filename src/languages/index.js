import LocalizedStrings from 'react-native-localization';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import en from './en';
import vi from './vi';
import displayLanguages from './displayLanguages';

/**
 * get localized text
 * l10n stand for localization
 */
export const l10n = new LocalizedStrings({
  vi,
  en,
});

export const setLanguage = async langCode => {
  const currentLang = l10n.getLanguage();
  console.log('-------- current display Lang:', l10n.getLanguage());
  console.log('-------- new Setting display language:', langCode, typeof langCode);
  console.log('-------- device Lang:', l10n.getInterfaceLanguage());

  if (!langCode) {
    console.log('-------- user not yet set display language');
    return;
  }
  if (langCode === currentLang) {
    console.log('-------- new Languages same as old display languages');
    return;
  }

  l10n.setLanguage(langCode);
  console.log('-------- after change display Lang:', l10n.getLanguage());
};

export function checkSupportDeviceLanguage() {
  let deviceLang = l10n.getInterfaceLanguage();
  deviceLang = deviceLang ? deviceLang.slice(0, 2) : '';
  console.log('=====> device lang code', deviceLang);
  const isSupportedLang = findIndex(displayLanguages, { code: deviceLang }) !== -1;
  return isSupportedLang ? deviceLang : '';
}

export function resetLanguage() {
  const _lang = checkSupportDeviceLanguage() || 'vi';
  setLanguage(_lang);
}

export const getLangCode = countryCode =>
  get(
    displayLanguages.filter(ele => {
      if (findIndex(get(ele, 'countryCodes', []), o => o === countryCode) !== -1) {
        return ele;
      }
      return null;
    }),
    '[0].code',
    'en'
  );
