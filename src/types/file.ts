import { JSONContent } from '@tiptap/react';

export interface ISaveData {
	content: JSONContent;
	markdown: string;
	version: string; // 文件版本
	updatedAt: string;
}
