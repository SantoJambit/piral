import { ForceOverwrite, PiletLanguage } from './apps/common';

export const forceOverwriteKeys = Object.keys(ForceOverwrite).filter(m => typeof ForceOverwrite[m] === 'number');

export function valueOfForceOverwrite(key: string): ForceOverwrite {
  for (const forceOverwriteKey of forceOverwriteKeys) {
    if (forceOverwriteKey === key) {
      return ForceOverwrite[forceOverwriteKey];
    }
  }

  return ForceOverwrite.no;
}

export function keyOfForceOverwrite(value: ForceOverwrite) {
  for (const forceOverwriteKey of forceOverwriteKeys) {
    if (ForceOverwrite[forceOverwriteKey] === value) {
      return forceOverwriteKey;
    }
  }

  return forceOverwriteKeys[0];
}

export const piletLanguageKeys = Object.keys(PiletLanguage).filter(m => typeof PiletLanguage[m] === 'number');

export function valueOfPiletLanguage(key: string): PiletLanguage {
  for (const piletLanguageKey of piletLanguageKeys) {
    if (piletLanguageKey === key) {
      return PiletLanguage[piletLanguageKey];
    }
  }

  return PiletLanguage.ts;
}

export function keyOfPiletLanguage(value: PiletLanguage) {
  for (const piletLanguageKey of piletLanguageKeys) {
    if (PiletLanguage[piletLanguageKey] === value) {
      return piletLanguageKey;
    }
  }

  return piletLanguageKeys[0];
}
