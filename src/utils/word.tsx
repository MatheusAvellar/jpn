
export interface JPWord {
	furigana: string;
	kanji: string;
}

export function JPWordToHTML(word: JPWord, kanji: boolean) {
	if(!kanji) return word.furigana;
	return (
		<ruby>
			{word.kanji}
			<rp>[</rp><rt>{word.furigana}</rt><rp>]</rp>
		</ruby>
	);
}
