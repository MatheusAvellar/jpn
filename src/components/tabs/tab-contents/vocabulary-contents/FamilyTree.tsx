import { FormattedMessage } from "react-intl";
import Person from "./Person";
import type { familyMembers } from "./VocabFamily";
import { familyGroup, familyTree } from "./styles.css";


interface FamilyTreeProps {
	highlight: typeof familyMembers[number] | undefined;
	isYourFamily: boolean;
};

export default function FamilyTree({ highlight, isYourFamily }: FamilyTreeProps) {
	const color = isYourFamily ? "#d8ebfd" : "#f8d4ce";

	return (
	<section className={familyTree}>
		<div>
			<FormattedMessage id="vocabulary.family.grandparents"/>
			<div className={familyGroup} style={{ backgroundColor: highlight == "grandparents" ? color : "" }}>
				<Person i18nID="vocabulary.family.grandpa" highlight={highlight == "grandpa" && color}/>
				<Person i18nID="vocabulary.family.grandma" highlight={highlight == "grandma" && color}/>
			</div>
		</div>
		<div>
			<div className={familyGroup}>
				<Person i18nID="vocabulary.family.uncle" highlight={highlight == "uncle" && color}/>
				<Person i18nID="vocabulary.family.aunt" highlight={highlight == "aunt" && color}/>
				<div>
					<FormattedMessage id="vocabulary.family.parents"/>
					<div className={familyGroup} style={{ backgroundColor: highlight == "parents" ? color : "" }}>
						<Person i18nID="vocabulary.family.father" highlight={highlight == "father" && color}/>
						<Person i18nID="vocabulary.family.mother" highlight={highlight == "mother" && color}/>
					</div>
				</div>
			</div>
		</div>
		<div>
			<FormattedMessage id="vocabulary.family.children"/>
			<div className={familyGroup} style={{ backgroundColor: highlight == "children" ? color : "" }}>
				<Person i18nID="vocabulary.family.son" highlight={highlight == "son" && color}/>
				<Person i18nID="vocabulary.family.daughter" highlight={highlight == "daughter" && color}/>
			</div>
		</div>
		<div>
			<FormattedMessage id="vocabulary.family.siblings"/>
			<div className={familyGroup} style={{ backgroundColor: highlight == "siblings" ? color : "" }}>
				<Person i18nID="vocabulary.family.younger-brother" highlight={highlight == "younger-brother" && color}/>
				<Person i18nID="vocabulary.family.older-brother" highlight={highlight == "older-brother" && color}/>
				<div>
					<FormattedMessage id="vocabulary.family.sisters"/>
					<div className={familyGroup} style={{ backgroundColor: highlight == "sisters" ? color : "" }}>
						<Person i18nID="vocabulary.family.younger-sister" highlight={highlight == "younger-sister" && color}/>
						<Person i18nID="vocabulary.family.older-sister" highlight={highlight == "older-sister" && color}/>
					</div>
				</div>
				<Person i18nID="vocabulary.family.you" highlight={false}/>
			</div>
		</div>
		<div>
			<FormattedMessage id="vocabulary.family.couple"/>
			<div className={familyGroup} style={{ backgroundColor: highlight == "couple" ? color : "" }}>
				<Person i18nID="vocabulary.family.husband" highlight={highlight == "husband" && color}/>
				<Person i18nID="vocabulary.family.wife" highlight={highlight == "wife" && color}/>
			</div>
		</div>
	</section>
	);
};
