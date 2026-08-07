import type { ReactNode } from "react";
import { NumberJP, splitByPowersOf10 } from "./number";




const hourMapping = {
	1: { furigana: "いちじ", kanji: "一時", },
	2: { furigana: "にじ", kanji: "二時", },
	3: { furigana: "さんじ", kanji: "三時", },
	4: { furigana: "よじ", kanji: "四時", },
	5: { furigana: "ごじ", kanji: "五時", },
	6: { furigana: "ろくじ", kanji: "六時", },
	7: { furigana: "しちじ", kanji: "七時", },
	8: { furigana: "はちじ", kanji: "八時", },
	9: { furigana: "くじ", kanji: "九時", },
	10: { furigana: "じゅうじ", kanji: "十時", },
	11: { furigana: "じゅういちじ", kanji: "十一時", },
	12: { furigana: "じゅうにじ", kanji: "十二時", },
};


export class HourJP {
	value: number;

	constructor(value: number) {
		this.value = value;
	}

	toString(kanji?: boolean): string {
		const word = hourMapping[this.value as keyof typeof hourMapping];
		if(kanji) return word.kanji;
		return word.furigana;
	}

	toHTML(kanji?: boolean): ReactNode {
		const word = hourMapping[this.value as keyof typeof hourMapping];
		if(kanji)
			return (
				<ruby>
					{word.kanji}
					<rp>[</rp><rt>{word.furigana}</rt><rp>]</rp>
				</ruby>
			);
		return <span>{word.furigana}</span>;
	}
};


const minuteEndingsMapping = {
	1: { furigana: "いっぷん", kanji: "一分", },
	2: { furigana: "にふん", kanji: "二分", },
	3: { furigana: "さんぷん", kanji: "三分", },
	4: { furigana: "よんぷん", kanji: "四分", },
	5: { furigana: "ごふん", kanji: "五分", },
	6: { furigana: "ろっぷん", kanji: "六分", },
	7: { furigana: "ななふん", kanji: "七分", },
	8: { furigana: "はっぷん", kanji: "八分", },
	9: { furigana: "きゅうふん", kanji: "九分", },
	10: { furigana: "じゅっぷん", kanji: "十分", },
};

export class MinuteJP {
	value: number;

	constructor(value: number) {
		this.value = value;
	}

	#_toArray() {
		const powers = splitByPowersOf10(this.value);
		const last = powers.pop();
		const lastPower = last?.value;
		if(!this.value || last === undefined || lastPower === undefined)
			return [];
		if(lastPower in minuteEndingsMapping) {
			const lastCharacter = minuteEndingsMapping[lastPower as keyof typeof minuteEndingsMapping];
			const regularNumber = new NumberJP(
				powers.reduce((prev, cur) => prev + cur.value, 0)
			);
			return [...regularNumber._toArray(), lastCharacter];
		}
		// If we're here, then lastPower is an exact multiple of 10, larger than 10
		if(last.power === 10) {
			const lastCharacter = minuteEndingsMapping[10];
			const regularNumber = new NumberJP(last.digit);
			return [...regularNumber._toArray(), lastCharacter];
		}
		console.warn(`???? ${last} ????`);
		return [];
	}

	toString(kanji?: boolean): string {
		return this.#_toArray().map(v => kanji ? v.kanji : v.furigana).join("");
	}

	toHTML(kanji?: boolean): ReactNode {
		return this.#_toArray().map((obj, idx) => {
			if(kanji)
				return (
					<ruby key={idx}>
						{obj.kanji}
						<rp>[</rp><rt>{obj.furigana}</rt><rp>]</rp>
					</ruby>
				);
			return <span key={idx}>{obj.furigana}</span>;
		});
	}
};