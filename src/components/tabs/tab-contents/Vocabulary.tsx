import { useState } from "react";
import { FormattedMessage } from "react-intl";

import VocabFamily from "./vocabulary-contents/VocabFamily";
import { selectStyle } from "@/components/ui/select/styles.css";
import Button from "@/components/ui/button/Button";
import { vocab_nextButton } from "./vocabulary-contents/styles.css";
import VocabPositions from "./vocabulary-contents/VocabPositions";
import VocabMisc from "./vocabulary-contents/VocabMisc";


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
				<option value="misc">
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
				case "misc":
					return <VocabMisc forceSkipState={vocabLevel}/>;
				default:
					return "";
			}
		})()}
	</>;
};
