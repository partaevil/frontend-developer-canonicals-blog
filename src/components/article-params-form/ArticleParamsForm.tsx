import { ArrowButton } from '../arrow-button';
import { Button } from '../button';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Spacing } from '../spacing';
import { Text } from '../text';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
} from '../../constants/articleProps';
import { ArticleParamsFormProps } from '../../types';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

export const ArticleParamsForm = ({
	isOpen,
	onClose,
	formState,
	onFormChange,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const handleFieldChange = (field: keyof ArticleStateType, value: any) => {
		onFormChange({ ...formState, [field]: value });
	};

	return (
		<>
			<ArrowButton onClick={onClose} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Spacing size={50} />
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => handleFieldChange('fontFamilyOption', value)}
					/>
					<Spacing size={30} />
					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(value) => handleFieldChange('fontSizeOption', value)}
					/>
					<Spacing size={30} />
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(value) => handleFieldChange('fontColor', value)}
					/>
					<Spacing size={50} />
					<Separator />
					<Spacing size={50} />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(value) => handleFieldChange('backgroundColor', value)}
					/>
					<Spacing size={30} />
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(value) => handleFieldChange('contentWidth', value)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
