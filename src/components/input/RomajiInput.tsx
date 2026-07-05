import {
	useEffect,
	useRef,
	type Dispatch,
	type SetStateAction,
	type SubmitEvent,
	type MouseEvent
} from "react";
import * as wanakana from "wanakana";

import { inputWrapperStyle } from "./styles.css";


interface RomajiInputProps {
	inputValue: string;
	setInputValue: Dispatch<SetStateAction<string>>;
	onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export default function RomajiInput({ inputValue, setInputValue, onSubmit }: RomajiInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if(inputRef.current)
			wanakana.bind(inputRef.current);
	}, [inputRef.current]);

	function updateParentContext() {
		setInputValue(inputRef.current?.value || "");
	}

	return (
		<form className={inputWrapperStyle} onSubmit={(evt) => {
			evt.preventDefault();
			if(inputValue.endsWith("n")) {
				// fixme: surely there's a more elegant way
				setInputValue(inputValue.replace(/n$/i, "ん"));
			}
			onSubmit(evt);
		}}>
			<input
				id="romaji-input"
				name="romaji"
				type="text"
				ref={inputRef}
        value={inputValue}
				onChange={updateParentContext}
				onKeyUp={updateParentContext}
				/>
			<button>OK</button>
		</form>
	);
};
