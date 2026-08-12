import { useSettings } from "@/utils/settings";
import { JPWordToHTML, type JPWord } from "@/utils/word";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import RomajiInput from "@/components/input/RomajiInput";
import { vocab_questionWrapper, vocab_marqueeBig } from "./styles.css";
import { feedbackSection_labelStyle } from "@/components/input/styles.css";
import { play } from "cuelume";
import { FormattedMessage } from "react-intl";


const countriesOptions = ["china", "south-korea"] as const;
const countries: Record<typeof countriesOptions[number], JPWord[]> = {
	"china": [{ furigana: "ちゅうごく", kanji: "中国" }],
	"south-korea": [{ furigana: "かんこく", kanji: "韓国" }],
};

const occupationsOptions = [
	"pupil", "student",
	"company-employee", "bank-employee", "govt-employee", "shop-employee",
	"journalist",
	"medical-doctor", "nurse",
	"teacher", "lawyer",
	"driver",
	"policeman",
	"fishmonger",
	"psychologist",
] as const;
const occupations: Record<typeof occupationsOptions[number], JPWord[]> = {
	"pupil": [{ furigana: "せいと", kanji: "生徒" }],
	"student": [{ furigana: "がくせい", kanji: "学生" }],

	"company-employee": [{ furigana: "かいしゃいん", kanji: "会社員" }],
	"bank-employee": [{ furigana: "ぎんこういん", kanji: "銀行員" }],
	"govt-employee": [{ furigana: "こうむいん", kanji: "公務員" }],
	"shop-employee": [{ furigana: "てんいん", kanji: "店員" }],

	"journalist": [{ furigana: "きしゃ", kanji: "記者" }],
	"medical-doctor": [{ furigana: "いしゃ", kanji: "医者" }],
	"nurse": [{ furigana: "かんごし", kanji: "看護師" }],
	"teacher": [{ furigana: "きょうし", kanji: "教師" }],
	"lawyer": [{ furigana: "べんごし", kanji: "弁護士" }],
	"driver": [{ furigana: "うんてんしゅ", kanji: "運転手" }],
	"policeman": [{ furigana: "けいかん", kanji: "警官" }],
	"fishmonger": [{ furigana: "さかなや", kanji: "魚屋" }],
	"psychologist": [{ furigana: "しんりがくしゃ", kanji: "心理学者" }],
};

const objectsOptions = [
	"car", "boat",
	"subway",
	"bicycle",
	"pencil", "book",
	"newspaper",
	"desk",
	"chair",
	"bag",
	"shoe", "sock",
	"umbrella",
	"house",
	"clock",
	"bridge",
	"chopsticks",
	"phone",
	"light",
] as const;
const objects: Record<typeof objectsOptions[number], JPWord[]> = {
	"car": [{ furigana: "くるま", kanji: "車" }],
	"boat": [{ furigana: "ふね", kanji: "船" }],
	"subway": [{ furigana: "ちかてつ", kanji: "地下鉄" }],
	"bicycle": [{ furigana: "じてんしゃ", kanji: "自転車" }],
	"pencil": [{ furigana: "えんぴつ", kanji: "鉛筆" }],
	"book": [{ furigana: "ほん", kanji: "本" }],
	"newspaper": [{ furigana: "しんぶん", kanji: "新聞" }],
	"desk": [{ furigana: "つくえ", kanji: "机" }],
	"chair": [{ furigana: "いす", kanji: "椅子" }],
	"bag": [{ furigana: "かばん", kanji: "鞄" }],
	"shoe": [{ furigana: "くつ", kanji: "靴" }],
	"sock": [{ furigana: "くつした", kanji: "靴下" }],
	"umbrella": [{ furigana: "かさ", kanji: "傘" }],
	"house": [
		{ furigana: "いえ", kanji: "家" },
		{ furigana: "うち", kanji: "家" },
		{ furigana: "たく", kanji: "宅" },
	],
	"clock": [{ furigana: "とけい", kanji: "時計" }],
	"bridge": [{ furigana: "はし", kanji: "橋" }],
	"chopsticks": [{ furigana: "はし", kanji: "箸" }],
	"phone": [{ furigana: "でんわ", kanji: "電話" }],
	"light": [{ furigana: "でんき", kanji: "電気" }],
};

const adjectivesOptions = [
	"lively",
	"kind",
	"busy",
	"bustling",
	"calm",
	"new", "old", "young",
	"delicious", "unpalatable",
	"clean",
	"famous",
	"expensive-tall", "cheap",
	"hot", "cold", "warm", "cool",
	"big", "small",
	"spacious", "narrow",
] as const;
const adjectives: Record<typeof adjectivesOptions[number], JPWord[]> = {
	"lively": [{ furigana: "げんき", kanji: "元気" }],
	"kind": [{ furigana: "やさしい", kanji: "優しい" }],
	"busy": [{ furigana: "いそがしい", kanji: "忙しい" }],
	"bustling": [{ furigana: "にぎやか", kanji: "賑やか" }],
	"calm": [{ furigana: "しずか", kanji: "静か" }],
	"new": [{ furigana: "あたらしい", kanji: "新しい" }],
	"old": [{ furigana: "ふるい", kanji: "古い" }],
	"young": [{ furigana: "わかい", kanji: "若い" }],
	"delicious": [{ furigana: "おいしい", kanji: "美味しい" }],
	"unpalatable": [{ furigana: "まずい", kanji: "不味い" }],
	"clean": [{ furigana: "きれい", kanji: "綺麗" }],
	"famous": [{ furigana: "ゆうめい", kanji: "有名" }],
	"expensive-tall": [{ furigana: "たかい", kanji: "高い" }],
	"cheap": [{ furigana: "やすい", kanji: "安い" }],
	"hot": [{ furigana: "あつい", kanji: "暑い" }],
	"cold": [{ furigana: "さむい", kanji: "寒い" }],
	"warm": [{ furigana: "あたたかい", kanji: "暖かい" }],
	"cool": [{ furigana: "すずしい", kanji: "涼しい" }],
	"big": [{ furigana: "おおきい", kanji: "大きい" }],
	"small": [{ furigana: "ちいさい", kanji: "小さい" }],
	"spacious": [{ furigana: "ひろい", kanji: "広い" }],
	"narrow": [{ furigana: "せまい", kanji: "狭い" }],
};

const miscOptions = [
	"exam",
	"trip",
	"vacation",

	"spring", "summer", "autumn", "winter",

	"building", "school", "post-office", "hospital",
] as const;
const misc: Record<typeof miscOptions[number], JPWord[]> = {
	"exam": [{ furigana: "しけん", kanji: "試験" }],
	"trip": [{ furigana: "りょこう", kanji: "旅行" }],
	"vacation": [{ furigana: "やすみ", kanji: "休み" }],

	"spring": [{ furigana: "はる", kanji: "春" }],
	"summer": [{ furigana: "なつ", kanji: "夏" }],
	"autumn": [{ furigana: "あき", kanji: "秋" }],
	"winter": [{ furigana: "ふゆ", kanji: "冬" }],

	"building": [{ furigana: "たてもの", kanji: "建物" }],
	"school": [{ furigana: "がっこう", kanji: "学校" }],
	"post-office": [{ furigana: "ゆうびんきょく", kanji: "郵便局" }],
	"hospital": [{ furigana: "びょういん", kanji: "病院" }],
};

const allOptions = [
	...countriesOptions,
	...occupationsOptions,
	...objectsOptions,
	...adjectivesOptions,
	...miscOptions,
] as const;
type allKeys = typeof allOptions[number];
const all: Record<allKeys, JPWord[]> = {
	...countries,
	...occupations,
	...objects,
	...adjectives,
	...misc,
};


interface VocabMiscProps {
	forceSkipState: number;
}

export default function VocabMisc({ forceSkipState }: VocabMiscProps) {
	const { settings } = useSettings();
	const showKanji = settings.kanji === "yes";

	const [inputValue, setInputValue] = useState<string>("");

	const [levelDone, setLevelDone] = useState<boolean>(false);

	const [currentWord, setCurrentWord] = useState<allKeys>("car");
	const correctWords = all[currentWord];

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
			randomMember = allOptions[~~(Math.random() * allOptions.length)];
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
			<div className={vocab_marqueeBig}>
				<FormattedMessage id={`vocabulary.misc.${currentWord}`}/>
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
