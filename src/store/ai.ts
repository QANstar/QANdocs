import { atom } from 'jotai';
import { IAiSetting } from '../types/ai';

const aiAtom = atom<IAiSetting | null>(null);

export { aiAtom };
