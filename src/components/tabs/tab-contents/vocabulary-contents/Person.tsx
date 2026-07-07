import { FormattedMessage } from "react-intl";
import { person } from "./styles.css";

interface PersonProps {
	i18nID: string;
	highlight: string | false;
}

export default function Person({ i18nID, highlight }: PersonProps) {
	return (
		<div
			className={person}
			style={{ backgroundColor: highlight || "#fff" }}
		>
			<FormattedMessage id={i18nID}/>
		</div>
	);
};
