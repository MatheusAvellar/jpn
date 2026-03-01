import { Verb, IchidanVerb, GodanVerb, IrregularVerb } from "@/utils/verbs"
import type { VerbConjugation } from "@/utils/verbs";
import { marqueeStyle } from "./styles.css";
import { useContext, useEffect, useState } from "react";
import { InputContext } from "../../../App";

const possibleConjugations: VerbConjugation[] = [
	// "plain present negative indicative",
	"plain past affirmative indicative",
	"plain gerund",
	"て-form",
];

export default function Verbs() {
	const romanjiInput = useContext(InputContext);

	const verbs = [
		new IchidanVerb("呉れる", {"呉":"く"}, ["to give"]),
		new IchidanVerb("見る", {"見":"み"}, ["to see"]),
		new IchidanVerb("食べる", {"食":"た"}, ["to eat"]),
		new IchidanVerb("浴びる", {"浴":"あ"}, ["to bathe", "to shower"]),
		
		new GodanVerb("書く", {"書":"か"}, ["to write"]),
		new GodanVerb("飲む", {"飲":"の"}, ["to drink"]),
		new GodanVerb("持つ", {"持":"も"}, ["to hold"]),
		new GodanVerb("噛む", {"噛":"か"}, ["to bite", "to chew"]),
		new GodanVerb("遊ぶ", {"遊":"あそ"}, ["to play"]),
		new GodanVerb("笑う", {"笑":"わら"}, ["to laugh"]),
		new GodanVerb("死ぬ", {"死":"し"}, ["to die"]),
		new GodanVerb("歩く", {"歩":"ある"}, ["to walk"]),
		new GodanVerb("話す", {"話":"はな"}, ["to talk"]),
		new GodanVerb("泳ぐ", {"泳":"およ"}, ["to swim"]),
		new GodanVerb("びびる", {}, ["to be scared", "to be intimidated"]),

		new IrregularVerb("来る", {"来":"く"}, ["to come"]),
		new IrregularVerb("行く", {"行":"い"}, ["to go"]),
		new IrregularVerb("する", {}, ["to do"]),
		new IrregularVerb("問う", {"問":"と"}, ["to ask"]),
		new IrregularVerb("乞う", {"乞":"こ"}, ["to ask", "to beg"]),
	];

	function getRandom(arr: any[]) {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	const [wordsSeen, setWordsSeen] = useState(0);
	const [currentVerb, setCurrentVerb] = useState<Verb | null>(null);
	const [conjugation, setConjugation] = useState<VerbConjugation | null>(null);

	function refresh() {
		setWordsSeen(wordsSeen+1);

		setCurrentVerb(getRandom(verbs));
		setConjugation(getRandom(possibleConjugations));
	}

	return (
		<>
			<button onClick={() => refresh()}>🔁</button>
			<span>{wordsSeen}</span>
			{(!currentVerb || !conjugation) ? "" : (
				<div style={{ textAlign: "center" }}>
					<div className={marqueeStyle}>
						{Verb.toHTML(
							currentVerb.dictionaryForm,
							currentVerb.furigana
						)}
					</div>
					<div>
						{currentVerb.translations.join(", ")}
					</div>
					<div>
						{conjugation}
					</div>
					<div style={{ color: "#fff" }}>
						{Verb.toHTML(
							currentVerb.conjugate(conjugation),
							currentVerb.furigana
						)}
					</div>
					<div>{romanjiInput}</div>
				</div>
			)}
		</>
	);
};
