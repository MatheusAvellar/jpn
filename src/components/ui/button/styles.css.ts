import { style } from "@vanilla-extract/css";

export const buttonStyle = style({
	appearance: "none",

	fontFamily: "inherit",
	fontSize: "1rem",
	fontWeight: "500",

	color: "var(--black-light)",
	backgroundColor: "var(--grey-light)",

	border: "2px solid var(--grey)",
	borderRadius: "var(--border-radius-lg)",
	padding: ".5rem",

	transform: "translate(0, -4px)",
	boxShadow: "0 4px 0 var(--grey)",
	transition: "transform 50ms ease, box-shadow 50ms ease",

	selectors: {
		"&:active": {
			backgroundColor: "white",
			borderColor: "var(--accent-dark)",
			boxShadow: "0 0px 0 var(--grey)",
			transform: "translate(0, 0px)",
		}
	},
});
