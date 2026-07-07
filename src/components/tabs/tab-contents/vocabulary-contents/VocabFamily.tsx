import { useSettings } from "@/utils/settings";
import { JPWordToHTML, type JPWord } from "@/utils/word";
import { Fragment } from "react/jsx-runtime";
import FamilyTree from "./FamilyTree";
import { useEffect, useState } from "react";
import RomajiInput from "@/components/input/RomajiInput";


export const familyMembers = [
	"grandparents",
	"grandpa", "grandma",

	"parents",
	"father", "mother",
	"uncle", "aunt",

	"couple",
	"husband", "wife",

	"children",
	"son", "daughter",

	"siblings",
	"sisters",
	"older-brother", "older-sister",
	"younger-brother", "younger-sister",
] as const;

type familyMemberKey = typeof familyMembers[number];

const myFamily: Record<familyMemberKey, JPWord[]> = {
	"grandparents": [{ furigana: "そふぼ", kanji: "祖父母" }],
	"grandpa": [{ furigana: "そふ", kanji: "祖父" }],
	"grandma": [{ furigana: "そぼ", kanji: "祖母" }],

	"parents": [{ furigana: "りょうしん", kanji: "両親" }],
	"father": [{ furigana: "ちち", kanji: "父" }],
	"mother": [{ furigana: "はは", kanji: "母" }],
	"uncle": [{ furigana: "おじ", kanji: "叔父" }],
	"aunt": [{ furigana: "おば", kanji: "叔母" }],

	"couple": [{ furigana: "ふうふ", kanji: "夫婦" }],
	"husband": [
		{ furigana: "しゅじん", kanji: "主人" },
		{ furigana: "おっと", kanji: "夫" },
	],
	"wife": [
		{ furigana: "かない", kanji: "家内" },
		{ furigana: "つま", kanji: "妻" },
	],

	"children": [{ furigana: "こども", kanji: "子供" }],
	"son": [{ furigana: "むすこ", kanji: "息子" }],
	"daughter": [{ furigana: "むすめ", kanji: "娘" }],

	"siblings": [{ furigana: "きょうだい", kanji: "兄弟" }],
	"sisters": [{ furigana: "しまい", kanji: "姉妹" }],
	"older-brother": [{ furigana: "あに", kanji: "兄" }],
	"older-sister": [{ furigana: "あね", kanji: "姉" }],
	"younger-brother": [{ furigana: "おとうと", kanji: "弟" }],
	"younger-sister": [{ furigana: "いもうと", kanji: "妹" }],
};

const theirFamily: Record<familyMemberKey, JPWord[]> = {
	"grandparents": [{ furigana: "そふぼ", kanji: "祖父母" }],
	"grandpa": [{ furigana: "おじいさん", kanji: "お祖父さん" }],
	"grandma": [{ furigana: "おばあさん", kanji: "お祖母さん" }],

	"parents": [{ furigana: "ごりょうしん", kanji: "ご両親" }],
	"father": [{ furigana: "お父さん", kanji: "おとうさん" }],
	"mother": [{ furigana: "おかあさん", kanji: "お母さん" }],
	"uncle": [{ furigana: "おじさん", kanji: "叔父さん" }],
	"aunt": [{ furigana: "おばさん", kanji: "叔母さん" }],

	"couple": [{ furigana: "ごふうふ", kanji: "ご夫婦" }],
	"husband": [{ furigana: "ごしゅじん", kanji: "ご主人" }],
	"wife": [{ furigana: "おくさん", kanji: "奥さん" }],

	"children": [{ furigana: "おこさん", kanji: "お子さん" }],
	"son": [{ furigana: "むすこさん", kanji: "息子さん" }],
	"daughter": [{ furigana: "むすめさん", kanji: "娘さん" }],

	"siblings": [{ furigana: "ごきょうだい", kanji: "ご兄弟" }],
	"sisters": [{ furigana: "ごしまい", kanji: "ご姉妹" }],
	"older-brother": [{ furigana: "おにいさん", kanji: "お兄さん" }],
	"older-sister": [{ furigana: "おねえさん", kanji: "お姉さん" }],
	"younger-brother": [{ furigana: "おとうとさん", kanji: "弟さん" }],
	"younger-sister": [{ furigana: "いもうとさん", kanji: "妹さん" }],
};


export default function VocabFamily() {
	// かぞく
	const { settings } = useSettings();
	const showKanji = settings.kanji === "yes";

	const [inputValue, setInputValue] = useState<string>("");

	const [levelDone, setLevelDone] = useState<boolean>(false);

	const [isYourFamily, setIsYourFamily] = useState<boolean>(true);

	const [currentMember, setCurrentMember] = useState<familyMemberKey>("grandpa");
	const words = [theirFamily, myFamily][+isYourFamily][currentMember];

	const correctAnswer = (
		words.map(w => w.furigana).includes(
			inputValue.trim()
		)
	);

	function nextLevel() {
		setLevelDone(false);
		setInputValue("");

		// setWordsSeen(wordsSeen+1);
		const randomFamily = Math.random()*2 >= 0.5;
		setIsYourFamily(randomFamily);
		let randomMember = currentMember;
		while(randomMember === currentMember)
			randomMember = familyMembers[~~(Math.random() * familyMembers.length)];
		setCurrentMember(randomMember);
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

	return <>
		<button onClick={nextLevel}>つぎ ➡️</button>
		<section>
			<div style={{
				fontSize: "1.75rem",
				fontWeight: "600",
				textAlign: "center",
				color: isYourFamily ? "#2196f3" : "chocolate",
			}}>
				{isYourFamily ? "あなた" : "あいて"}
			</div>
			<FamilyTree highlight={currentMember} isYourFamily={isYourFamily}/>
		</section>
		<section>
			<div style={{ fontSize: "3rem", lineHeight: "1" }}>
				{levelDone && (correctAnswer ? "⭕" : "❌") || "\xa0"}
			</div>
			<div style={{ fontSize: "1.5rem" }}>
				{levelDone
					? <>
						<span>せいかい: </span>
						<span>
							{words.map((word, idx) => {
								return <>
									{idx > 0 && "\xa0 / \xa0"}
									<span key={idx}>
										{JPWordToHTML(word, showKanji)}
									</span>
								</>
							})}
						</span>
					</>
					: "\xa0"}
			</div>
			<div style={{ fontSize: "1.5rem" }}>
				{levelDone
					? <>
						<span>あなたの: </span>
						<span style={{ color: correctAnswer ? "#00cb55" : "#e52727" }}>
							{inputValue}
						</span>
					</>
					: "\xa0"}
			</div>
		</section>
		<RomajiInput
			inputValue={inputValue}
			setInputValue={setInputValue} 
			onSubmit={onSubmit}/>
	</>;
};
