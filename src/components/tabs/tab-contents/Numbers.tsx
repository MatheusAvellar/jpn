import { useState } from "react";
import { FormattedMessage } from "react-intl";

import { selectStyle } from "@/components/ui/select/styles.css";
import Button from "@/components/ui/button/Button";
import { numbers_nextButton } from "./numbers-contents/styles.css";

import CardinalNumbers from "./numbers-contents/CardinalNumbers";
import HoursNumbers from "./numbers-contents/Hours";


export default function Numbers() {
	const [numberChoice, setVocabChoice] = useState("cardinals");

	// bit of a roundabout way of calling a child function from a parent
	// in this case, we want to call child.nextLevel(); so we send an int
	// state and have a hook there that calls nextLevel() when it changes
	const [numbersLevel, setNumbersLevel] = useState<number>(0);

	function nextLevel() {
		setNumbersLevel((numbersLevel + 1) % 100);
	}

	return <>
		<div>
			<select
				name="number-choice"
				className={selectStyle}
				value={numberChoice}
				onChange={(e) => setVocabChoice(e.target.value)}
			>
				<option defaultChecked={true} value="cardinals">
					<FormattedMessage id="numbers.option.cardinals"/>
				</option>
				<option value="hours">
					<FormattedMessage id="numbers.option.hours"/>
				</option>
			</select>
			<Button
				onClick={nextLevel}
				className={numbers_nextButton}
			>
				つぎ <strong>&rarr;</strong>
			</Button>
		</div>
		{(() => {
			switch(numberChoice) {
				case "cardinals":
					return <CardinalNumbers forceSkipState={numbersLevel}/>;
				case "hours":
					return <HoursNumbers forceSkipState={numbersLevel}/>;
				default:
					return "";
			}
		})()}
	</>;
};
