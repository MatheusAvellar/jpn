import { createContext, useState } from "react";
import RomajiInput from "./components/input/RomajiInput";
import Tabs from "./components/tabs/Tabs";

export const InputContext = createContext<string>("");

export default function App() {
	const [inputValue, setInputValue] = useState<string>("");

	return (
		<>
			<header>
				<h1>jpn</h1>
			</header>
			<main>
				<InputContext value={inputValue}>
					<Tabs/>
					<RomajiInput setInputValue={setInputValue}/>
				</InputContext>
			</main>
			<footer>
				Made with &lt;3 by Matheus Avellar — Rio de Janeiro, 2026
			</footer>
		</>
	);
};
