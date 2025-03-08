import i18n from '../../../i18n';
import { TitleLevel } from '../../../types/docs';

interface IHeadingLevel {
	level: TitleLevel | 0;
	label: string;
	key: string;
}

const headingLevelList: IHeadingLevel[] = [
	{
		level: 0,
		label: i18n.t('toolbar.headingLevel.paragraph'),
		key: i18n.t('toolbar.headingLevel.paragraph'),
	},
	{
		level: 1,
		label: i18n.t('toolbar.headingLevel.h1'),
		key: 'H1',
	},
	{
		level: 2,
		label: i18n.t('toolbar.headingLevel.h2'),
		key: 'H2',
	},
	{
		level: 3,
		label: i18n.t('toolbar.headingLevel.h3'),
		key: 'H3',
	},
	{
		level: 4,
		label: i18n.t('toolbar.headingLevel.h4'),
		key: 'H4',
	},
	{
		level: 5,
		label: i18n.t('toolbar.headingLevel.h5'),
		key: 'H5',
	},
	{
		level: 6,
		label: i18n.t('toolbar.headingLevel.h6'),
		key: 'H6',
	},
];

export default headingLevelList;
