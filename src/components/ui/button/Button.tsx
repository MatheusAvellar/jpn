import type { ReactNode } from "react";
import { buttonStyle } from "./styles.css";


interface ButtonProps {
	children: ReactNode | ReactNode[];
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
	return (
		<button className={[buttonStyle, className].join(" ")} onClick={onClick}>
			{children}
		</button>
	);
}
