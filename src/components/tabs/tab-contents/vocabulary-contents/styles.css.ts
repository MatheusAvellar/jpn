import { style } from "@vanilla-extract/css";


export const familyTree = style({
	display: "flex",
	flexDirection: "column",
	gap: "2rem",
	border: "1px solid",
	padding: "0.25rem",
	maxWidth: "30rem",
	margin: "auto",
});

export const familyGroup = style({
	display: "flex",
	gap: "1rem",
	justifyContent: "center",
	alignItems: "flex-end",
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
	width: "4.5rem",
	height: "2rem",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	fontSize: ".85rem",
	textAlign: "center",
	lineHeight: "1",
});
