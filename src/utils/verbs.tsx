import type { ReactNode } from "react";
import { Word } from "./word";

export type VerbConjugation =
	| "plain present affirmative indicative"
	| "plain present negative indicative"
	| "plain past affirmative indicative"
	| "plain gerund"
	| "て-form"
	// ...

export class Verb extends Word {
	dictionaryForm: string;
	type: string;
	subtype: string;
	stem: string;

	constructor(dictionaryForm: string, furigana: object, translations: string[]) {
		super(dictionaryForm, furigana, translations);

		this.dictionaryForm = dictionaryForm;
		this.type = "Verb";
		this.subtype = "?";
		this.stem = "?";
	}

	toString(): string {
		return `<Verb(${this.dictionaryForm})>`;
	}

	static toHTML(word?: string, furigana?: object): ReactNode[] {
		// Override furigana for 来 plain past affirmative indicative
		if([ "来た", "来て" ].includes(word || ""))
			furigana = { "来": "き" };

		return super.toHTML(word, furigana);
	}

	conjugate(conjugation: VerbConjugation): string {
		return "?";
	}
}


export class IchidanVerb extends Verb {
	// eg. ('食べる', {'食':'た'}, ['to eat'])
	constructor(dictionaryForm: string, furigana: object, translations: string[]) {
		super(dictionaryForm, furigana, translations);

		this.type = "Ichidan verb";
		this.subtype = "";

		this.dictionaryForm = dictionaryForm;
		this.furigana = furigana;
		this.translations = translations;

		this.stem = dictionaryForm.slice(0, -1);
	}

	toString(): string {
		return `<IchidanVerb(${this.dictionaryForm})>`;
	}

	conjugate(conjugation: VerbConjugation): string {
		switch(conjugation) {
			// "eat" / "will eat"
			// eg. 食べる
			case "plain present affirmative indicative":
				return this.dictionaryForm;

			// "don't eat"
			// eg. 食べない
			case "plain present negative indicative":
				return this.stem + "ない";

			// "ate"
			// eg. 食べた
			case "plain past affirmative indicative":
				return this.stem + "た";

			// conjunctive form
			// eg. 食べて
			case "て-form":
				return this.stem + "て";

			// "am eating"
			// eg. 食べている
			case "plain gerund":
				return this.conjugate("て-form") + "いる"

			default:
				console.warn(`Unknown conjugation ${conjugation}`);
				return "?";
		}
	}

	// potential() {}
	// [Ref] https://www.tofugu.com/japanese-grammar/verb-potential-form-reru/#ichidan-verbs
	// 〜られる -> 〜れる
};


export class GodanVerb extends Verb {
	// eg. ('笑う', {'笑':'わら'}, ['to laugh'])
	constructor(dictionaryForm: string, furigana: object, translations: string[]) {
		super(dictionaryForm, furigana, translations);

		this.type = "Godan verb";

		switch(dictionaryForm.slice(-1)) {
			case "う": case "つ": case "る": this.subtype = "うつる group"; break;
			case "ぬ": case "ぶ": case "む": this.subtype = "ぬぶむ group"; break;
			case "く": this.subtype = "く group"; break;
			case "ぐ": this.subtype = "ぐ group"; break;
			case "す": this.subtype = "す group"; break;
			default: this.subtype = "? group";
		}

		this.dictionaryForm = dictionaryForm;
		this.furigana = furigana;
		this.translations = translations;

		this.stem = dictionaryForm.slice(0, -1);
	}

	toString() {
		return `<GodanVerb(${this.dictionaryForm})>`;
	}

	conjugate(conjugation: VerbConjugation): string {
		switch(conjugation) {
			// "laugh" / "will laugh"
			// eg. 笑う
			case "plain present affirmative indicative":
				return this.dictionaryForm;

			// "don't laugh"
			// eg. 
			case "plain present negative indicative":
				return "NOT IMPLEMENTED";  // FIXME

			// "laughed"
			// eg. 笑った
			case "plain past affirmative indicative":
				if(this.subtype === "うつる group")
					return this.stem + "った";
				if(this.subtype === "ぬぶむ group")
					return this.stem + "んだ";
				if(this.subtype === "く group")
					return this.stem + "いた";
				if(this.subtype === "ぐ group")
					return this.stem + "いだ";
				if(this.subtype === "す group")
					return this.stem + "した";
				console.warn(`[GodanVerb] Unknown subtype ${this.subtype}`);
				return "?た";

			// conjunctive form
			// eg. 笑って
			case "て-form":
				if(this.subtype === "うつる group")
					return this.stem + "って";
				if(this.subtype === "ぬぶむ group")
					return this.stem + "んで";
				if(this.subtype === "く group")
					return this.stem + "いて";
				if(this.subtype === "ぐ group")
					return this.stem + "いで";
				if(this.subtype === "す group")
					return this.stem + "して";
				console.warn(`[GodanVerb] Unknown subtype ${this.subtype}`);
				return "?て";

			// "am laughing"
			// eg. 笑っている
			case "plain gerund":
				return this.conjugate("て-form") + "いる"

			default:
				console.warn(`Unknown conjugation ${conjugation}`);
				return "?";
		}
	}
};


export class IrregularVerb extends Verb {
	// eg. ('来る', {'来':'く'}, ['to come'])
	constructor(dictionaryForm: string, furigana: object, translations: string[]) {
		super(dictionaryForm, furigana, translations);

		this.type = "Irregular verb";

		switch(dictionaryForm) {
			case "来る": this.subtype = "来る"; break;
			case "する": this.subtype = "する"; break;
			case "行く": this.subtype = "行く"; break;
			case "問う": this.subtype = "問う"; break;
			case "乞う": this.subtype = "乞う"; break;
			default: this.subtype = "?";
		}

		this.dictionaryForm = dictionaryForm;
		this.furigana = furigana;
		this.translations = translations;

		this.stem = dictionaryForm.slice(0, -1);
	}

	toString() {
		return `<IrregularVerb(${this.dictionaryForm})>`;
	}

	conjugate(conjugation: VerbConjugation): string {
		switch(conjugation) {
			// 
			// eg. 
			case "plain present affirmative indicative":
				return this.dictionaryForm;

			// 
			// eg. 
			case "plain present negative indicative":
				return "NOT IMPLEMENTED";  // FIXME

			// 
			// eg. 
			case "plain past affirmative indicative":
				if(this.subtype === "来る")
					return "来た";
				if(this.subtype === "する")
					return "した";
				if(this.subtype === "行く")
					return "行った";
				if(this.subtype === "問う")
					return "問うた";
				if(this.subtype === "乞う")
					return "乞うた";
				console.warn(`[IrregularVerb] Unknown verb ${this.subtype}`);
				return "?た";

			// conjunctive form
			// eg. 
			case "て-form":
				if(this.subtype === "来る")
					return "来て";
				if(this.subtype === "する")
					return "して";
				if(this.subtype === "行く")
					return "行って";
				if(this.subtype === "問う")
					return "問うて";
				if(this.subtype === "乞う")
					return "乞うて";
				console.warn(`[IrregularVerb] Unknown verb ${this.subtype}`);
				return "?て";

			// 
			// eg. 
			case "plain gerund":
				return this.conjugate("て-form") + "いる"

			default:
				console.warn(`Unknown conjugation ${conjugation}`);
				return "?";
		}
	}
};
