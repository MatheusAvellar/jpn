import { marqueeStyle } from "../styles.css";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { useSettings } from "@/utils/settings";
import RomajiInput from "@/components/input/RomajiInput";
import { feedbackSection_labelStyle } from "@/components/input/styles.css";
import { FormattedMessage } from "react-intl";
import { HourJP, MinuteJP } from "@/utils/time";
import { play } from "cuelume";


interface HoursNumbersProps {
	forceSkipState: number;
}

export default function HoursNumbers({ forceSkipState }: HoursNumbersProps) {
	const { settings } = useSettings();
	const [inputValue, setInputValue] = useState<string>("");

	const [levelDone, setLevelDone] = useState<boolean>(false);

	// const [wordsSeen, setWordsSeen] = useState(0);
	const [currentHour, setCurrentHour] = useState<number>(12);
	const [currentMinute, setCurrentMinute] = useState<number>(0);
	const [isAM, setIsAM] = useState<boolean>(false);

	const [show24h, setShow24h] = useState<boolean>(true);

	const displayedTime = useMemo(() => {
		const pad = (x: number) => `${x}`.padStart(2, "0");

		const paddedMinute = pad(currentMinute);
		if(show24h) {
			if(isAM && currentHour === 12)
				return `00:${paddedMinute}`;
			if(!isAM) {
				const adjustedHour = (currentHour + 12) % 24 || 12;
				return `${pad(adjustedHour)}:${paddedMinute}`;
			}
		}
		return `${pad(currentHour)}:${paddedMinute}`;
	}, [currentHour, currentMinute, isAM, show24h])

	function onShow24hChanged(evt: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
		setShow24h(!!evt.target.checked);
	}

	const showKanji = settings.kanji === "yes";
	const hourObj = new HourJP(currentHour);
	const hourHTML = hourObj.toHTML(showKanji);
	const hourString = hourObj.toString(false);

	const minuteObj = new MinuteJP(currentMinute);
	const minuteHTML = minuteObj.toHTML(showKanji);
	const minuteString = minuteObj.toString(false);

	const correctPrefixes = [
		isAM
		? "あさ"
		: currentHour < 6
			? "ひる"
			: "よる",
		isAM ? "ごぜん" : "ごご"
	];

	const correctAnswer = (
		correctPrefixes
		.map(v => v + hourString + minuteString)
		.includes(inputValue)
	);

	function getRandom(value: number) {
		return Math.floor(Math.random() * value);
	}

	function nextLevel() {
		setLevelDone(false);
		setInputValue("");

		// setWordsSeen(wordsSeen+1);
		setCurrentHour(getRandom(12) + 1); //1-12
		setCurrentMinute(getRandom(60)); // 0-59
		setIsAM(!!getRandom(2));
	}

	function onSubmit() {
		if(!levelDone) {
			setLevelDone(true);
			play(correctAnswer ? "success": "error");
			return
		}
		// if we've received a second submission, it's likely
		// the user wants to go to the next level
		nextLevel();
	}

	useEffect(() => {
		nextLevel();
	}, [forceSkipState]); // skip level whenever parent changes variable

	return (
		<div style={{ display: "grid", gridTemplateRows: "auto 1fr auto" }}>
			<fieldset style={{ width: "max-content", }}>
				<label>
					<input type="checkbox" checked onChange={onShow24hChanged}/>
					<FormattedMessage id="numbers.setting.show-24h-clock"/>
				</label>
			</fieldset>
			{/* <span>{wordsSeen}</span> */}
			<div className={marqueeStyle}>
				{displayedTime}{
					!show24h
						? <>&nbsp;{isAM ? "AM" : "PM"}</>
						: null
				}
			</div>
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
							({correctPrefixes.join(" / ")}) {hourHTML} {minuteHTML}
						</div>
					</>
				)}
			</RomajiInput>
		</div>
	);
};