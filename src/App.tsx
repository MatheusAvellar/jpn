import { createContext } from "react";
import Tabs from "./components/tabs/Tabs";
import SettingsProvider from "./utils/settings";

export const InputContext = createContext<string>("");

export default function App() {
	return (
		<>
			<header>
				<h1>jpn</h1>
			</header>
			<main>
    		<SettingsProvider>
					<Tabs/>
				</SettingsProvider>
			</main>
			<footer>
				Made with &lt;3 by Matheus Avellar — Rio de Janeiro, 2026
			</footer>
		</>
	);
};
