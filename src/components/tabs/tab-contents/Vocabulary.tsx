import RomajiInput from "@/components/input/RomajiInput";
import { useSettings } from "@/utils/settings";
import { useState } from "react";



export default function Vocabulary() {
	const { settings } = useSettings();

	const [inputValue, setInputValue] = useState<string>("");

	const showKanji = settings.kanji === "yes";

	function onSubmit() {
		// hey :)
	}

	// かぞく
	// Parents - りょうしん / ごりょうしん
	// Dad     - ちち / おとうさん
	// Mom     - はは / おかあさん

	// Siblings - きょうだい / ごきょうだい
	// Sisters  - しまい / ごしまい
	// Older brother - あに / おにいさん
	// Younger brother - おとうと / おとうとさん
	// Older sister - あね / おねえさん
	// Younger sister - いもうと / いもうとさん

	// Children - こども / おこさん
	// Son      - むすこ / むすこさん
	// Daughter - むすめ / むすめさん

	// [married] couple - ふうふ / ごふうふ
	// Husband - しゅじん [trad.], おっと [mod.] / ごしゅじん
	// Wife - かない [trad.], つま [mod.] / おくさん


	return <>
		<select>
			<option defaultChecked={true} value="family">かぞく &ndash; Family</option>
			<option disabled value="occupations">しょくぎょう &ndash; Occupations</option>
			<option disabled value="misc">Misc.</option>
		</select>
		<RomajiInput
			inputValue={inputValue}
			setInputValue={setInputValue} 
			onSubmit={onSubmit}/>
	</>;
};
