import { style } from "@vanilla-extract/css";


//// Home
export const noAIBadgeStyle = style({
	display: "grid",
	gridTemplateColumns: "auto 1fr",
	width: "14rem",
	gap: ".5rem",
	color: "#231f20",
	border: "2px solid #231f20",
	padding: ".5rem",
	fontSize: ".75rem",
	textDecoration: "none",
	position: "absolute",
	bottom: "1rem",
});



export const marqueeStyle = style({
	fontSize: "5rem",
	fontWeight: "700",
	lineHeight: "1",
	textAlign: "center",
});


//// Numbers
export const numbers_datalistStyle = style({
	display: "grid",
	gridTemplateColumns: "repeat(4, 1fr)",
	gap: ".25rem",
	width: "12rem",
});
export const numbers_optionStyle = style({
	padding: 0,
})
export const numbers_inputRangeStyle = style({
	width: "12rem",
	margin: 0,
});


//// Vocabulary
export const vocab_selectMenu = style({
	padding: ".5rem 1rem .5rem .5rem",
	border: "2px solid var(--grey)",
	borderRadius: "var(--border-radius-md)",
	fontSize: "1rem",
	fontFamily: "inherit",
});
