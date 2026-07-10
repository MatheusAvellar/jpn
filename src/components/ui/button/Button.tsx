import { useEffect, useRef, type ReactNode } from "react";
import { buttonStyle } from "./styles.css";


interface ButtonProps extends React.ComponentProps<"button"> {
	children: ReactNode | ReactNode[];
	className?: string;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const button = buttonRef.current;

		const handleTouchStart = (event: TouchEvent) => {
			if(button) button.classList.add("active");
		};
		const handTouchEnd = (event: TouchEvent) => {
			if(button) button.classList.remove("active");
		};

		if(button) {
			button.addEventListener("touchstart", handleTouchStart, { passive: true });
			button.addEventListener("touchend", handTouchEnd, { passive: true });
		}

		return () => {
			if(button) {
				button.removeEventListener("touchstart", handleTouchStart);
				button.removeEventListener("touchend", handTouchEnd);
			}
		};
	}, []);

	return (
		<button
			ref={buttonRef}
			className={[buttonStyle, className].join(" ")}
			{...rest}
		>
			{children}
		</button>
	);
}
