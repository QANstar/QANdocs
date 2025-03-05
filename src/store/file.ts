import { atom } from 'jotai';
import i18n from '../i18n';

const fileNameAtom = atom(i18n.t('header.defaultTitle'));

const filePathAtom = atom('');

export { fileNameAtom, filePathAtom };
