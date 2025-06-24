import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { ArrowButton } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
	title: 'Components/ArrowButton',
	tags: ['autodocs'],
	argTypes: {
		onClick: {
			action: 'clicked',
		},
	},
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

export const Default: Story = {
	render: function Render(args) {
		const [isOpen, setIsOpen] = useState(false);

		const handleClick = () => {
			setIsOpen((prev) => !prev);
			args.onClick();
		};

		return <ArrowButton onClick={handleClick} isOpen={isOpen} />;
	},
};
