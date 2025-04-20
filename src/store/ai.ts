import { atom } from 'jotai';
import { AiType, IAiSetting } from '../types/ai';

const aiAtom = atom<IAiSetting>({ type: AiType.DeepSeek });

export { aiAtom };
