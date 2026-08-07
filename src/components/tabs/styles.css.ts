import { style } from "@vanilla-extract/css";

// TABS
export const hamburgerMenuBtn = style({
	padding: "1rem",
	selectors: {
		"&:hover": {
			backgroundColor: "var(--accent-light)",
		},
	}
});
export const hamburgerMenu = style({
	position: "fixed",
	top: "3.5rem",
	translate: "-110% 0",
	transition: "translate 50ms ease, opacity 25ms linear",
	selectors: {
		":checked ~ &": {
			translate: "0% 0",
		},
		"&:is([data-open='false'])": {
			opacity: "0",
			userSelect: "none",
		},
	},
});

export const tabStyle = style({
	display: "flex",
	flexWrap: "wrap",
	backgroundColor: "var(--grey-light)",
	borderBottom: "2px solid var(--grey)",
	columnGap: ".25rem",
});

export const labelStyle = style({
	display: "block",
	padding: ".5rem 1rem",
	border: "2px solid var(--grey)",
	borderBottom: "none",
	borderRadius: "4px 4px 0 0",
	backgroundColor: "white",
	fontSize: "1.25rem",
	lineHeight: "1",
	cursor: "pointer",
	selectors: {
		"input:checked + &": {
			backgroundColor: "var(--accent)",
			cursor: "default",
		},
		"&:hover": {
			backgroundColor: "var(--accent-light)",
		},
		"div:last-of-type > &": {
			borderBottom: "2px solid var(--grey)",
			borderRadius: "4px",
		},
	},
});

// CONTENT
export const tabContentStyle = style({
	display: "grid",
	gridTemplateRows: "auto 1fr auto",
	minHeight: 0,  // [!] insane trick that makes the height work (not a joke)
	padding: "1rem 1rem 0",
	"@media": {
		"(max-width: 500px)": {
			padding: "1rem 0.25rem 0"
		},
	},
});


export const correctAnswerStyle = style({
	color: "var(--color-answer-correct)",
});
export const incorrectAnswerStyle = style({
	color: "var(--color-answer-incorrect)",
});
