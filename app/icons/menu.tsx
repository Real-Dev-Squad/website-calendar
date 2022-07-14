interface Props {
	width?: number;
	height?: number;
	className?: string;
}

export const Menu: React.FC<Props> = ({ width, height, className }) => {
	return (
		<svg
			viewBox="0 0 24 24"
			width={width ? width : '24'}
			height={height ? height : '24'}
			stroke="currentColor"
			stroke-width="2"
			fill="none"
			stroke-linecap="round"
			stroke-linejoin="round"
			className={className}
		>
			<line x1="3" y1="12" x2="21" y2="12"></line>
			<line x1="3" y1="6" x2="21" y2="6"></line>
			<line x1="3" y1="18" x2="21" y2="18"></line>
		</svg>
	);
};
