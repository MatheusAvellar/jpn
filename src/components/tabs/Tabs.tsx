import { useState } from "react";
import { FormattedMessage } from "react-intl";

import TabHeader from "./TabHeader";
import TabContent from "./TabContent";
import Home from "./tab-contents/Home";
import Numbers from "./tab-contents/Numbers";
import ConfigScreen from "./tab-contents/ConfigScreen";
import Vocabulary from "./tab-contents/Vocabulary";
// import Kana from "./tab-contents/Kana";
// import Verbs from "./tab-contents/Verbs";
// import Adjectives from "./tab-contents/Adjectives";
// import Sentences from "./tab-contents/Sentences";


export default function Tabs() {
	const [selectedTab, setSelectedTab] = useState(1);

	return (
		<>
			<TabHeader defaultChecked={selectedTab} setSelectedTab={setSelectedTab}>
				<FormattedMessage id="tab.settings"/>
				<FormattedMessage id="tab.home"/>
				<FormattedMessage id="tab.numbers"/>
				{/* <FormattedMessage id="tab.kana"/> */}
				{/* <FormattedMessage id="tab.verbs"/> */}
				{/* <FormattedMessage id="tab.adjectives"/> */}
				{/* <FormattedMessage id="tab.sentences"/> */}
				<FormattedMessage id="tab.vocabulary"/>
			</TabHeader>
			<TabContent selectedTab={selectedTab}>
				<ConfigScreen/>
				<Home/>
				<Numbers/>
				{/* <Kana/> */}
				{/* <Verbs/> */}
				{/* <Adjectives/> */}
				{/* <Sentences/> */}
				<Vocabulary/>
			</TabContent>
		</>
	);
};
