import type { Dispatch, ReactNode, SetStateAction } from "react";
import { tabStyle, labelStyle } from "./styles.css.ts";

interface TabHeaderProps {
	children: ReactNode[];
	defaultChecked: number;
	setSelectedTab: Dispatch<SetStateAction<number>>;
};

export default function TabHeader({ children, setSelectedTab, defaultChecked }: TabHeaderProps) {
	const tabs = [...children];

	return (
		<nav className={tabStyle}>
			{
				tabs.map((e, i) => {
					return (
						<div key={i}>
							<input
								id={`tab-${i}`}
								value={`tab-${i}`}
								type="radio"
								name="tab"
								defaultChecked={i === defaultChecked}
								onChange={() => setSelectedTab(i)}
								style={{ appearance: "none", position: "absolute" }}
								/>
							<label htmlFor={`tab-${i}`} className={labelStyle}>
								{e}
							</label>
						</div>
					);
				})
			}
		</nav>
	);
};
