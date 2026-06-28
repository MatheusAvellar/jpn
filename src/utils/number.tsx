import type { ReactNode } from "react";

const mapping = {
	1: { furigana: "いち", kanji: "一", },
	2: { furigana: "に", kanji: "二", },
	3: { furigana: "さん", kanji: "三", },
	4: { furigana: "よん", kanji: "四", },
	5: { furigana: "ご", kanji: "五", },
	6: { furigana: "ろく", kanji: "六", },
	7: { furigana: "なな", kanji: "七", },
	8: { furigana: "はち", kanji: "八", },
	9: { furigana: "きゅう", kanji: "九", },
	10: { furigana: "じゅう", kanji: "十", },
	100: { furigana: "ひゃく", kanji: "百", },
	300: { furigana: "さんびゃく", kanji: "三百", },
	600: { furigana: "ろっぴゃく", kanji: "六百", },
	800: { furigana: "はっぴゃく", kanji: "八百", },
	1_000: { furigana: "せん", kanji: "千", },
	3_000: { furigana: "さんぜん", kanji: "三千", },
	8_000: { furigana: "はっせん", kanji: "八千", },
	10_000: { furigana: "まん", kanji: "万", },
};

function splitByPowersOf10(num: number) {
	const str = Math.abs(num).toString();
	return str.split("").map((digitStr, index) => {
		const digit = parseInt(digitStr);
		const power = 10 ** (str.length - 1 - index);
		return {
			digit: digit,
			power: power,
			value: digit * power,
		};
	}).filter(obj => obj.value !== 0);
}

export class NumberJP {
	value: number;

	constructor(value: number) {
		this.value = value;
	}
	toString(): string {
		return `<Number(${this.value})>`;
	}

	static toHTML(value?: number): ReactNode[] {
		if(!value) return [""];

		const powers = splitByPowersOf10(value);
		return powers.map((n, idx) => {
			if(n.value in mapping) {
				const obj = mapping[n.value];
				return (
					<ruby key={idx}>
						{obj.kanji}
						<rp>[</rp><rt>{obj.furigana}</rt><rp>]</rp>
					</ruby>
				);
			}
			const unit = mapping[n.digit];
			const power = n.power === 1 ? null : mapping[n.power];
			return [unit, power].filter(v => !!v).map((obj, i) => {
				return (
					<ruby key={`${idx}-${i}`}>
						{obj.kanji}
						<rp>[</rp><rt>{obj.furigana}</rt><rp>]</rp>
					</ruby>
				);
			});
		})
	}

};
