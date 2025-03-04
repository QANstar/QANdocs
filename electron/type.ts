export interface IFrameApi {
	minimize: () => void;
	toggleMaximize: () => void;
	close: () => void;
}

export interface IFileSaveAsResult {
	success: boolean;
	fileName: string;
	error: string;
}

export interface IFileSaveAsOptions {
	defaultPath?: string;
	fileData: string;
	fileName: string;
}

export interface IFileApi {
	saveAs: (options: IFileSaveAsOptions) => Promise<IFileSaveAsResult>;
}
