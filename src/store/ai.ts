import { atom } from 'jotai';
import { AiType, IAiSetting } from '../types/ai';

const aiAtom = atom<IAiSetting>({ type: AiType.DeepSeek });

const chatMessagesAtom = atom([]);

export { aiAtom, chatMessagesAtom };
