import type { ReactNode } from "react";

export class Word {
	word: string;
	furigana: object;
	translations: string[];

	// eg. ('私', {'私':'わたし'}, ['I', 'me'])
	constructor(word: string, furigana: object, translations: string[]) {
		this.word = word;
		this.furigana = furigana || {};
		this.translations = translations;
	}

	toString(): string {
		return `<Word(${this.word})>`;
	}

	static toHTML(word?: string, furigana?: object): ReactNode[] {
		if(!word) return [""];
		if(!furigana) return [word];

		let pieces: any[] = [ word ];

		// For each furigana [kanji, hiragana] pair
		for(let kanji of Object.entries(furigana)) {
			const kanjiFrom = kanji[0];
			const kanjiTo = kanji[1];

			const nextPieces = [];
			// For each piece of output we already have
			for(let i = 0; i < pieces.length; i++) {
				// If no kanji in current piece
				if(typeof pieces[i] !== "string"
				|| pieces[i].indexOf(kanjiFrom) < 0) {
					// Save it, move on
					nextPieces.push(pieces[i]);
					continue;
				}
				// If there is kanji here, split piece on it
				const splitPiece = pieces[i].split(kanjiFrom);
				// For each split result
				for(const pc of splitPiece) {
					// If the string has any size, add it
					if(pc.length > 0)
						nextPieces.push(pc);
					// Add <ruby> tag with furigana
					nextPieces.push(
						<ruby>
							{kanjiFrom}
							<rp>[</rp><rt>{kanjiTo}</rt><rp>]</rp>
						</ruby>
					);
				}
				// Remove last <ruby> tag which will be superfluous
				nextPieces.pop();
			}
			// Update pieces with processed ones
			pieces = nextPieces;
		}
		return pieces;
	}
};
