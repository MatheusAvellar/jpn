import { useState } from "react";

import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import Home from "./tab-contents/Home";
import Numbers from "./tab-contents/Numbers";
// import Kana from "./tab-contents/Kana";
// import Verbs from "./tab-contents/Verbs";
// import Adjectives from "./tab-contents/Adjectives";
// import Sentences from "./tab-contents/Sentences";


export default function Tabs() {
	const [selectedTab, setSelectedTab] = useState(0);

	return (
		<>
			<TabHeader setSelectedTab={setSelectedTab}>
				<span>Home</span>
				<span>Numbers</span>
				{/* <span>Kana</span> */}
				{/* <span>Verbs</span> */}
				{/* <span>Adjectives</span> */}
				{/* <span>Sentences</span> */}
			</TabHeader>
			<TabContent selectedTab={selectedTab}>
				<Home/>
				<Numbers/>
				{/* <Kana/> */}
				{/* <Verbs/> */}
				{/* <Adjectives/> */}
				{/* <Sentences/> */}
			</TabContent>
		</>
	);
};
