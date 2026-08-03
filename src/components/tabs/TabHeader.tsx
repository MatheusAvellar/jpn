import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { tabStyle, labelStyle, hamburgerMenu, hamburgerMenuBtn } from "./styles.css.ts";
import { play } from "cuelume";

interface TabHeaderProps {
	children: ReactNode[];
	defaultChecked: number;
	setSelectedTab: Dispatch<SetStateAction<number>>;
};

export default function TabHeader({ children, setSelectedTab, defaultChecked }: TabHeaderProps) {
	const tabs = [...children];
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	return (
		<nav className={tabStyle}>
			<input
				id="hamburger-menu-button"
				name="burger-menu"
				type="checkbox"
				checked={isMenuOpen}
				onChange={(e) => setIsMenuOpen(e.target.checked)}
				style={{ appearance: "none", position: "absolute" }}/>
			<label htmlFor="hamburger-menu-button" className={hamburgerMenuBtn}>
				🟰
			</label>
			<aside className={hamburgerMenu} data-open={isMenuOpen}>
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
									onChange={() => {
										play("page");
										setIsMenuOpen(false);
										setSelectedTab(i);
									}}
									style={{ appearance: "none", position: "absolute" }}
									/>
								<label htmlFor={`tab-${i}`} className={labelStyle}>
									{e}
								</label>
							</div>
						);
					})
				}
			</aside>
		</nav>
	);
};
