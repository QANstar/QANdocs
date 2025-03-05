export interface IFrameApi {
	minimize: () => void;
	toggleMaximize: () => void;
	close: () => void;
}

export interface IFileSaveAsResult {
	success: boolean;
	fileName: string;
	path: string;
	error: string;
}

export interface IFileSaveAsOptions {
	defaultPath?: string;
	fileData: string;
	fileName: string;
}

export interface IFileSaveResult {
	success: boolean;
	error?: string;
}

export interface IFileSaveOptions {
	path: string;
	fileData: string;
}

export interface IFileOpenResult {
	success: boolean;
	fileData?: string;
	path?: string;
	fileName?: string;
	error?: string;
}

export interface IFileApi {
	saveAs: (options: IFileSaveAsOptions) => Promise<IFileSaveAsResult>;
	save: (options: IFileSaveOptions) => Promise<IFileSaveResult>;
	open: () => Promise<IFileOpenResult>;
}
