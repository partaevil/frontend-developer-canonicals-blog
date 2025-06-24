import clsx from 'clsx';
import arrow from '../../images/arrow.svg';

import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
	onClick: () => void;
	isOpen: boolean;
};

export const ArrowButton = ({ onClick, isOpen }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}
			onKeyDown={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
};
