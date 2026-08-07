import { useState } from "react";
import { FormattedMessage } from "react-intl";

import VocabFamily from "./vocabulary-contents/VocabFamily";
import { selectStyle } from "@/components/ui/select/styles.css";
import Button from "@/components/ui/button/Button";
import { vocab_nextButton } from "./vocabulary-contents/styles.css";
import VocabPositions from "./vocabulary-contents/VocabPositions";


export default function Vocabulary() {
	const [vocabChoice, setVocabChoice] = useState("family");

	// bit of a roundabout way of calling a child function from a parent
	// in this case, we want to call child.nextLevel(); so we send an int
	// state and have a hook there that calls nextLevel() when it changes
	const [vocabLevel, setVocabLevel] = useState<number>(0);

	function nextLevel() {
		setVocabLevel((vocabLevel + 1) % 100);
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
				<option value="positions">
					<FormattedMessage id="vocabulary.option.positions"/>
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
				className={vocab_nextButton}
			>
				つぎ <strong>&rarr;</strong>
			</Button>
		</div>
		{(() => {
			switch(vocabChoice) {
				case "family":
					return <VocabFamily forceSkipState={vocabLevel}/>;
				case "positions":
					return <VocabPositions forceSkipState={vocabLevel}/>;
				case "occupations":
				case "misc":
				default:
					return "";
			}
		})()}
	</>;
};
