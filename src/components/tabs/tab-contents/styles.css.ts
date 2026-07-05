import { style } from "@vanilla-extract/css";

export const marqueeStyle = style({
	fontSize: "3rem",
	lineHeight: "1",
});


//// Numbers
export const numbers_datalistStyle = style({
	display: "grid",
	gridTemplateColumns: "repeat(4, 1fr)",
	width: "12rem",
});
export const numbers_optionStyle = style({
	padding: 0,
})
export const numbers_inputRangeStyle = style({
	width: "12rem",
	margin: 0,
});
