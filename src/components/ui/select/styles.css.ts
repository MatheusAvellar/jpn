import { style } from "@vanilla-extract/css";

export const selectStyle = style({
	fontFamily: "inherit",
	fontSize: "1rem",

	color: "var(--black-light)",
	backgroundColor: "var(--white)",

	border: "2px solid var(--grey)",
	borderRadius: "var(--border-radius-lg)",
	padding: ".5rem 1rem .5rem .5rem",
});
