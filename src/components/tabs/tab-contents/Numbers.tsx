import { marqueeStyle } from "./styles.css";
import { useContext, useRef, useState } from "react";
import { InputContext } from "../../../App";
import { NumberJP } from "@/utils/number";


export default function Numbers() {
	const romajiInput = useContext(InputContext);

	// const [wordsSeen, setWordsSeen] = useState(0);
	const [currentNumber, setCurrentNumber] = useState<number>(0);

	const [include10, setInclude10] = useState<boolean>(false);
	const [include100, setInclude100] = useState<boolean>(false);
	const [include1000, setInclude1000] = useState<boolean>(false);
	const [include10000, setInclude10000] = useState<boolean>(false);

	function getRandom() {
		return Math.floor(Math.random() * 10);
	}

	function refresh() {
		// setWordsSeen(wordsSeen+1);
		setCurrentNumber(
			getRandom()
			+ (+include10) * getRandom() * 10
			+ (+include100) * getRandom() * 100
			+ (+include1000) * getRandom() * 1000
			+ (+include10000) * getRandom() * 10000
		);
	}

	return (
		<>
			<button onClick={() => refresh()}>🔁</button>
			<label>
				<input type="checkbox"
					onChange={(evt) => setInclude10(evt.target.checked)}/>
				10
			</label>
			<label>
				<input type="checkbox"
					onChange={(evt) => setInclude100(evt.target.checked)}/>
				100
			</label>
			<label>
				<input type="checkbox"
					onChange={(evt) => setInclude1000(evt.target.checked)}/>
				1,000
			</label>
			<label>
				<input type="checkbox"
					onChange={(evt) => setInclude10000(evt.target.checked)}/>
				10,000
			</label>
			{/* <span>{wordsSeen}</span> */}
			<div style={{
				display: "grid", height: "100%",
				justifyContent: "center", alignItems: "center",
				textAlign: "center",
			}}>
				<div style={{ display: "grid", gap: "1rem" }}>
					<div className={marqueeStyle}>
						{currentNumber}
					</div>
					<div style={{ fontSize: "150%" }}>
						{NumberJP.toHTML(currentNumber)}
					</div>
					<div style={{ fontSize: "150%" }}>
						{romajiInput || "\xa0"}
					</div>
				</div>
			</div>
		</>
	);
};
