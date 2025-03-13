import i18n from '../../../../i18n';
import styles from './index.module.less';
import { useAtom } from 'jotai';
import { editorAtom } from '../../../../store';
import { Popover } from 'antd';
import TableGridSelection from './TableGridSelection';
import { useState } from 'react';

const Table = () => {
	const [editor] = useAtom(editorAtom);
	const [open, setOpen] = useState(false);

	const toggleMenu = (rows: number, cols: number) => {
		setOpen(false);
		editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
	};

	const handleOpenChange = (open: boolean) => {
		setOpen(open);
	};

	return (
		<div className={styles.tableInsert}>
			<Popover arrow={false} onOpenChange={handleOpenChange} open={open} placement="leftTop" content={<TableGridSelection onSelected={toggleMenu} />}>
				<div>{i18n.t('toolbar.insertTable')}</div>
			</Popover>
		</div>
	);
};

export default Table;
