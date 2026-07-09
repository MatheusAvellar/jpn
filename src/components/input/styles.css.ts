import { style } from "@vanilla-extract/css";

export const inputWrapperStyle = style({
	display: "flex",
	flexDirection: "column",
	rowGap: "1rem",
	
	width: "100%",
	padding: "1rem",
	backgroundColor: "var(--accent-light)",
});

export const inputSectionStyle = style({
	display: "grid",
	gridTemplateColumns: "1fr auto",
	gap: ".5rem",
});

export const romajiInputStyle = style({
	appearance: "none",
	width: "100%",
	fontFamily: "inherit",
	fontSize: "1.25rem",
	color: "var(--black-dark)",
	border: "2px solid var(--grey)",
	borderRadius: "var(--border-radius-lg)",
	padding: ".5rem",
	selectors: {
		"&:focus-visible": {
			borderColor: "var(--accent-dark)",
			outline: "none",
		}
	},
});

export const inputSubmitStyle = style({
	width: "100%",
	fontSize: "1.25rem",
	aspectRatio: "1.75",
	padding: 0,
});

export const feedbackSectionStyle = style({
	display: "grid",
	gridTemplateColumns: "auto 1fr",
	alignItems: "start",
	columnGap: ".5rem",

	fontSize: "1.5rem",
});
export const feedbackSection_labelStyle = style({
	fontSize: "1rem",
	fontWeight: "bold",
	lineHeight: "2",
	color: "var(--color-answer-correct)",
});
