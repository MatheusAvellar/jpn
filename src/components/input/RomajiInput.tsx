import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import * as wanakana from "wanakana";

import { inputWrapperStyle } from "./styles.css";


interface RomajiInputProps {
	setInputValue: Dispatch<SetStateAction<string>>;
};

export default function RomajiInput({ setInputValue }: RomajiInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if(inputRef.current)
			wanakana.bind(inputRef.current);
	}, [inputRef.current]);

	function updateParentContext() {
		setInputValue(inputRef.current?.value || "");
	}

	return (
		<div className={inputWrapperStyle}>
			<input
				id="romaji-input"
				type="text"
				ref={inputRef}
				onChange={() => updateParentContext()}
				/>
			<button>OK</button>
		</div>
	);
};
