import type { ReactNode } from "react";
import { tabContentStyle } from "./styles.css";

interface TabContentProps {
	children: ReactNode[];
	selectedTab: number;
};

export default function TabContent({ children, selectedTab }: TabContentProps) {
	const tabs = [...children];

	return (
		<section className={tabContentStyle}>
			{tabs[selectedTab]}
		</section>
	);
};
