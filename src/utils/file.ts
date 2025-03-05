import { fileSuffix } from '../../share/config';

export const getFileNameWithoutSuffix = (fileName: string) => {
	const newFileName = fileName.split(/[/\\]/).pop()?.replace(`.${fileSuffix}`, '') || fileName;
	return newFileName;
};
