import { marqueeStyle, numbers_datalistStyle, numbers_inputRangeStyle, numbers_optionStyle } from "./styles.css";
import { useEffect, useState } from "react";
import { NumberJP } from "@/utils/number";
import { useSettings } from "@/utils/settings";
import RomajiInput from "@/components/input/RomajiInput";
import { correctAnswerStyle, incorrectAnswerStyle } from "../styles.css";
import Button from "@/components/ui/button/Button";
import { feedbackSection_labelStyle } from "@/components/input/styles.css";


export default function Numbers() {
	const { settings } = useSettings();
	const [inputValue, setInputValue] = useState<string>("");

	const [levelDone, setLevelDone] = useState<boolean>(false);

	// const [wordsSeen, setWordsSeen] = useState(0);
	const [currentNumber, setCurrentNumber] = useState<number>(0);

	const showKanji = settings.kanji === "yes";
	const numberObj = new NumberJP(currentNumber);
	const numberHTML = numberObj.toHTML(showKanji);
	const numberString = numberObj.toString(false);

	const correctAnswer = numberString.trim() === inputValue.trim();

	const [include100, setInclude100] = useState<boolean>(true);
	const [include1000, setInclude1000] = useState<boolean>(true);
	const [include10000, setInclude10000] = useState<boolean>(false);

	function resetDifficulty(value: string) {
		setInclude100(false);
		setInclude1000(false);
		setInclude10000(false);
		switch(value) {
			// @ts-ignore - intentional fallthrough
			case "4":
				setInclude10000(true);
			// @ts-ignore
			case "3":
				setInclude1000(true);
			// @ts-ignore
			// https://github.com/Microsoft/TypeScript/issues/19573
			case "2":
					setInclude100(true);
			default: break;
		}
	}

	function onDifficultyChange(event: React.InputEvent<HTMLInputElement>) {
		resetDifficulty((event.currentTarget as HTMLInputElement).value);
	}

	function getRandom() {
		return Math.floor(Math.random() * 10);
	}

	function nextLevel() {
		setLevelDone(false);
		setInputValue("");

		// setWordsSeen(wordsSeen+1);
		setCurrentNumber(
			(
				getRandom()
				+ getRandom() * 10
				+ (+include100) * getRandom() * 100
				+ (+include1000) * getRandom() * 1000
				+ (+include10000) * getRandom() * 10000
			) || 1  // prevent zeroes
		);
	}

	function onSubmit() {
		if(!levelDone)
			return setLevelDone(true);
		// if we've received a second submission, it's likely
		// the user wants to go to the next level
		nextLevel();
	}

	useEffect(() => {
		nextLevel()
	}, []);  // on mount

	return (
		<>
			<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
				<fieldset style={{ display: "inline-block" }}>
					<input
						type="range"
						list="range-values"
						min="1"
						max="4"
						onInput={onDifficultyChange}
						className={numbers_inputRangeStyle}/>
					<datalist id="range-values" className={numbers_datalistStyle}>
						<option value="1" label="10" className={numbers_optionStyle} style={{ textAlign: "left" }}></option>
						<option value="2" label="100" className={numbers_optionStyle} style={{ textAlign: "center" }}></option>
						<option value="3" label="1,000" className={numbers_optionStyle} style={{ textAlign: "center" }}></option>
						<option value="4" label="10,000" className={numbers_optionStyle} style={{ textAlign: "right" }}></option>
					</datalist>
				</fieldset>
				<Button onClick={nextLevel}>つぎ <strong>&rarr;</strong></Button>
			</div>
			{/* <span>{wordsSeen}</span> */}
			<div className={marqueeStyle}>{currentNumber}</div>
			<RomajiInput
				inputValue={inputValue}
				setInputValue={setInputValue} 
				onSubmit={onSubmit}
			>
				{levelDone && (
					<>
						<div className={feedbackSection_labelStyle}>
							{correctAnswer ? "⭕" : "❌"} せいかい:
						</div>
						<div style={{ lineHeight: "1.5" }}>
							{numberHTML}
						</div>
					</>
				)}
			</RomajiInput>
		</>
	);
};
