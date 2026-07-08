import { useState } from "react";
import { FormattedMessage } from "react-intl";

import VocabFamily from "./vocabulary-contents/VocabFamily";
import { selectStyle } from "@/components/ui/select/styles.css";


export default function Vocabulary() {
	const [vocabChoice, setVocabChoice] = useState("family");

	return <>
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
		{(() => {
			switch(vocabChoice) {
				case "family":
					return <VocabFamily/>;
				case "occupations":
				case "misc":
				default:
					return "";
			}
		})()}
	</>;
};
