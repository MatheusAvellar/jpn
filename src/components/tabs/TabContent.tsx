import type { ReactNode } from "react";

interface TabContentProps {
	children: ReactNode[];
	selectedTab: number;
};

export default function TabContent({ children, selectedTab }: TabContentProps) {
	const tabs = [...children];

	return (
		<section>
			{tabs[selectedTab]}
		</section>
	);
};
