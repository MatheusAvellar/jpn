import { useState } from "react";
import { FormattedMessage } from "react-intl";

import VocabFamily from "./vocabulary-contents/VocabFamily";
import { selectStyle } from "@/components/ui/select/styles.css";
import Button from "@/components/ui/button/Button";
import { familyVocab_nextButton } from "./vocabulary-contents/styles.css";


export default function Vocabulary() {
	const [vocabChoice, setVocabChoice] = useState("family");

	// bit of a roundabout way of calling a child function from a parent
	// in this case, we want to call child.nextLevel(); so we send an int
	// state and have a hook there that calls nextLevel() when it changes
	const [familyLevel, setFamilyLevel] = useState<number>(0);

	function nextLevel() {
		setFamilyLevel((familyLevel + 1) % 100);
	}

	return <>
		<div>
			<select
				name="vocab-choice"
				className={selectStyle}
				value={vocabChoice}
				onChange={(e) => setVocabChoice(e.target.value)}
			>
				<option defaultChecked={true} value="family">
					<FormattedMessage id="vocabulary.option.family"/>
				</option>
				<option disabled value="occupations">
					<FormattedMessage id="vocabulary.option.occupations"/>
				</option>
				<option disabled value="misc">
					<FormattedMessage id="vocabulary.option.misc"/>
				</option>
			</select>
			<Button
				onClick={nextLevel}
				className={familyVocab_nextButton}
			>
				つぎ <strong>&rarr;</strong>
			</Button>
		</div>
		{(() => {
			switch(vocabChoice) {
				case "family":
					return <VocabFamily forceSkipState={familyLevel}/>;
				case "occupations":
				case "misc":
				default:
					return "";
			}
		})()}
	</>;
};
