import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

	const toggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleFormChange = (newFormState: ArticleStateType) => {
		setFormState(newFormState);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(formState);
		toggleForm();
	};

	const handleFormReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
		toggleForm();
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isFormOpen}
				onClose={toggleForm}
				formState={formState}
				onFormChange={handleFormChange}
				onSubmit={handleFormSubmit}
				onReset={handleFormReset}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
