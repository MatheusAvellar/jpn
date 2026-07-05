import { style } from "@vanilla-extract/css";

// TABS
export const tabStyle = style({
	display: "flex",
	borderBottom: "1px solid",
	gap: "0.5rem"
});

export const labelStyle = style({
	display: "block",
	padding: ".25rem .5rem",
	border: "1px solid",
	borderBottom: "none",
	selectors: {
		"input:checked + &": {
			backgroundColor: "#eee"
		}
	},
	lineHeight: "1",
});
