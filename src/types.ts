import { ArticleStateType } from './constants/articleProps';

export type ArticleParamsFormProps = {
	isOpen: boolean;
	formState: ArticleStateType;
	onFormChange: (newState: ArticleStateType) => void;
	onSubmit: (e: React.FormEvent) => void;
	onReset: () => void;
	onClose: () => void;
};
