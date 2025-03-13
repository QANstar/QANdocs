import { useState } from 'react';
import styles from './index.module.less';

const MAX_SIZE = 10;

interface ITableGridSelectionProps {
	onSelected: (rows: number, cols: number) => void;
}

const TableGridSelection = (props: ITableGridSelectionProps) => {
	const [hoveredSize, setHoveredSize] = useState({ rows: 0, cols: 0 });

	const handleMouseEnter = (row: number, col: number) => {
		setHoveredSize({ rows: row + 1, cols: col + 1 });
	};

	const handleMouseLeave = () => {
		setHoveredSize({ rows: 0, cols: 0 });
	};

	const handleClick = (row: number, col: number) => {
		const rows = row + 1;
		const cols = col + 1;
		props.onSelected(rows, cols);
	};

	const renderGrid = () => {
		const grid = [];

		for (let row = 0; row < MAX_SIZE; row++) {
			const cols = [];
			for (let col = 0; col < MAX_SIZE; col++) {
				const isActive = row < hoveredSize.rows && col < hoveredSize.cols;
				cols.push(
					<div
						key={`${row}-${col}`}
						className={`${styles.cell} ${isActive ? styles.active : ''}`}
						onMouseEnter={() => handleMouseEnter(row, col)}
						onClick={() => handleClick(row, col)}
					/>
				);
			}
			grid.push(
				<div key={row} className={styles.row}>
					{cols}
				</div>
			);
		}

		return grid;
	};

	return (
		<div onMouseLeave={handleMouseLeave} className={styles.grid}>
			{renderGrid()}
		</div>
	);
};

export default TableGridSelection;
