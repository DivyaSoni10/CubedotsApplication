import I18n from "./i18n";

export function translate(key) {
  return key ? I18n.t(key) : null
}