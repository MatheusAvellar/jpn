import {
	useEffect,
	useRef,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	type SubmitEvent,
} from "react";
import * as wanakana from "wanakana";

import { feedbackSectionStyle, inputSectionStyle, inputSubmitStyle, inputWrapperStyle, romajiInputStyle } from "./styles.css";
import Button from "../ui/button/Button";


interface RomajiInputProps {
	children?: ReactNode | ReactNode[];
	inputValue: string;
	setInputValue: Dispatch<SetStateAction<string>>;
	onSubmit: () => void;
};

export default function RomajiInput({ children, inputValue, setInputValue, onSubmit }: RomajiInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if(inputRef.current)
			wanakana.bind(inputRef.current);
	}, [inputRef.current]);

	function updateParentContext() {
		setInputValue(inputRef.current?.value || "");
	}

	function doSubmit() {
		if(inputValue.endsWith("n")) {
			// fixme: surely there's a more elegant way
			setInputValue(inputValue.replace(/n$/i, "ん"));
		}
		onSubmit();
	}

	return (
		<form className={inputWrapperStyle}>
			<section className={feedbackSectionStyle}>
				{children}
			</section>
			<section className={inputSectionStyle}>
				<input
					id="romaji-input"
					name="romaji"
					type="text"
					ref={inputRef}
					className={romajiInputStyle}
					value={inputValue}
					onChange={updateParentContext}
					onKeyUp={updateParentContext}
				/>
				<Button
					className={inputSubmitStyle}
					onMouseDown={(evt) => {
						evt.preventDefault();
					}}
					onClick={(evt) => {
						evt.preventDefault();
						doSubmit();
					}}>
						OK
					</Button>
			</section>
		</form>
	);
};
