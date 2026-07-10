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
	transition: "transform 25ms ease, box-shadow 25ms ease",

	// touch-action: none prevents zooming/panning on the element,
	// but in exchange receives touch events immediately
	touchAction: "none",
	userSelect: "none",
	cursor: "pointer",

	WebkitTapHighlightColor: "transparent",

	selectors: {
		"&:active, &.active": {
			backgroundColor: "white",
			borderColor: "var(--accent-dark)",
			boxShadow: "0 0px 0 var(--grey)",
			transform: "translate(0, 0px)",
		}
	},
});
