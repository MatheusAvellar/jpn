import { createContext } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";

import { useSettings } from "@/utils/settings";
import Tabs from "@/components/tabs/Tabs";

import enMessages from "@/i18n/en-us.ts";
import ptMessages from "@/i18n/pt-br.ts";

const messagesMap: Record<string, Record<string, string>> = {
	"en-us": enMessages,
	"pt-br": ptMessages,
};

export const InputContext = createContext<string>("");

export default function App() {
	const { settings } = useSettings();
	const locale = settings.lang;
	const messages = messagesMap[locale];

	return (
		<IntlProvider locale={locale} messages={messages}>
			<header>
				<h1>
					<FormattedMessage id="title"/>
				</h1>
			</header>
			<main>
				<Tabs/>
			</main>
			<footer>
				<FormattedMessage id="footer"/>
			</footer>
		</IntlProvider>
	);
};
