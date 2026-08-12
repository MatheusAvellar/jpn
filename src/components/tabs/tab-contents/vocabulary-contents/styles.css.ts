import { style } from "@vanilla-extract/css";


export const vocab_nextButton = style({
	float: "right",
});
export const vocab_questionWrapper = style({
	clear: "both",
	marginTop: ".5rem",
	overflowY: "auto",
});

export const vocab_marquee = style({
	fontSize: "2rem",
	textAlign: "center",
});
export const vocab_marqueeBig = style({
	fontSize: "4rem",
	fontWeight: 600,
	textAlign: "center",
});


export const familyTree = style({
	display: "flex",
	flexDirection: "column",
	gap: "2rem",
	maxWidth: "30rem",
	margin: "auto",
});

export const familyGroup = style({
	display: "flex",
	gap: "1rem",
	justifyContent: "center",
	alignItems: "flex-end",
	flexWrap: "wrap",
	border: "1px solid",
	padding: "0.25rem",
	"@media": {
		"(max-width: 500px)": {
			gap: "0.25rem"
		},
	},
});

export const person = style({
	border: "1px solid",
	width: "5.5rem",
	height: "2rem",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	fontSize: ".85rem",
	textAlign: "center",
	lineHeight: "1",
});
