import { useSettings } from "@/utils/settings";
import { JPWordToHTML, type JPWord } from "@/utils/word";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import RomajiInput from "@/components/input/RomajiInput";
import { vocab_questionWrapper, vocab_marquee } from "./styles.css";
import { feedbackSection_labelStyle } from "@/components/input/styles.css";
import { play } from "cuelume";
import { useIntl } from "react-intl";


export const positionsOptions = [
	"in-front", "behind",
	"left", "right", "adjacent",
	"between", "near",
	"above", "below",
	"inside", "outside",
	"vicinity",
] as const;

type positionsKey = typeof positionsOptions[number];

const positions: Record<positionsKey, JPWord[]> = {
	"in-front": [{ furigana: "まえ", kanji: "前" }],
	"behind": [{ furigana: "うしろ", kanji: "後ろ" }],
	"left": [{ furigana: "ひだり", kanji: "左" }],
	"right": [{ furigana: "みぎ", kanji: "右" }],
	"adjacent": [{ furigana: "となり", kanji: "隣" }],
	"between": [{ furigana: "あいだ", kanji: "間" }],
	"near": [{ furigana: "そば", kanji: "側" }],
	"above": [{ furigana: "うえ", kanji: "上" }],
	"below": [{ furigana: "した", kanji: "下" }],
	"inside": [{ furigana: "なか", kanji: "中" }],
	"outside": [{ furigana: "そと", kanji: "外" }],
	"vicinity": [{ furigana: "ちかく", kanji: "近く" }],
};

interface VocabPositionsProps {
	forceSkipState: number;
}

export default function VocabPositions({ forceSkipState }: VocabPositionsProps) {
	const { settings } = useSettings();
	const showKanji = settings.kanji === "yes";

	const intl = useIntl();

	const [inputValue, setInputValue] = useState<string>("");

	const [levelDone, setLevelDone] = useState<boolean>(false);

	const [currentWord, setCurrentWord] = useState<positionsKey>("near");
	const correctWords = positions[currentWord];

	const correctAnswer = (
		correctWords.map(w => w.furigana).includes(
			inputValue.trim()
		)
	);

	function nextLevel() {
		setLevelDone(false);
		setInputValue("");

		// setWordsSeen(wordsSeen+1);
		let randomMember = currentWord;
		while(randomMember === currentWord)
			randomMember = positionsOptions[~~(Math.random() * positionsOptions.length)];
		setCurrentWord(randomMember);
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

	return <>
		<section className={vocab_questionWrapper}>
			<div className={vocab_marquee}>
				{currentWord === "between" && (
					showKanji
					? <>
						<ruby>
							何とか
							<rp>[</rp><rt>なんとか</rt><rp>]</rp>
						</ruby> と{" "}
					</>
					: "なんとか と "
				)}
				{showKanji
					? (
						<ruby>
							何とか
							<rp>[</rp><rt>なんとか</rt><rp>]</rp>
						</ruby>
					)
					: "なんとか"
				} の
				(<strong style={{
					color: "chocolate",
					fontWeight: 600
				}}>{
					intl.formatMessage({
						id: `vocabulary.positions.${currentWord}`
					}).toLowerCase()
				}</strong>)
				<span style={{ whiteSpace: "nowrap" }}>です。</span>
			</div>
		</section>
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
						{correctWords.map((word, idx) => {
							return <Fragment key={idx}>
								{idx > 0 && "\xa0 / \xa0"}
								<span>
									{JPWordToHTML(word, showKanji)}
								</span>
							</Fragment>
						})}
					</div>
				</>
			)}
		</RomajiInput>
	</>;
};
