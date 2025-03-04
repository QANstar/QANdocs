import { Editor } from '@tiptap/react';
import { atom } from 'jotai';

const editorAtom = atom<Editor | null>(null);

export { editorAtom };
