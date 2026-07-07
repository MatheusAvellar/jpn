import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const settingsOptions = {
	// theme: ["light", "dark"] as const,
	lang: ["en-us", "pt-br"] as const,
	kanji: ["yes", "no"] as const,
};
interface SettingsProps {
	// theme: typeof settingsOptions.theme[number];
	lang: typeof settingsOptions.lang[number];
	kanji: typeof settingsOptions.kanji[number];
};
const DEFAULT_SETTINGS: SettingsProps = {
	// theme: "light",
	lang: "en-us",
	kanji: "no",
};


interface SettingsContextProps {
	settings: SettingsProps;
	updateSetting: (key: string, value: any) => void;
	resetSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

interface SettingsProviderProps {
	children: ReactNode;
};

export default function SettingsProvider({ children }: SettingsProviderProps) {
	// Initialize settings from localStorage, if they exist; fallback to default
	const [settings, setSettings] = useState<SettingsProps>(() => {
		const localData = localStorage.getItem("user_settings");
		return localData ? JSON.parse(localData) : DEFAULT_SETTINGS;
	});

	// On each update to settings, sync to localStorage
	useEffect(() => {
		localStorage.setItem("user_settings", JSON.stringify(settings));
	}, [settings]);

	// Update single property of settings
	const updateSetting = (key: string, value: any) => {
		setSettings((prev: SettingsProps) => ({
			...DEFAULT_SETTINGS,
			...prev,
			[key]: value,
		}));
	};
	// On mount, call update to add any new settings since last visit
	useEffect(() => {
		setSettings((prev: SettingsProps) => {
			const entries = (
				Object.entries({
					...DEFAULT_SETTINGS,
					...prev,
				})
				.filter(([key]) => key in DEFAULT_SETTINGS)
			);
			return Object.fromEntries(entries) as unknown /* fixme */ as SettingsProps;
		});
	}, []);

	// Reset to default settings
	const resetSettings = () => {
		setSettings(DEFAULT_SETTINGS);
	};

	return (
		<SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
			{children}
		</SettingsContext.Provider>
	);
};

export const useSettings = () => {
	const context = useContext(SettingsContext);
	if(!context)
		throw new Error('useSettings must be used within a SettingsProvider');
	return context;
};
