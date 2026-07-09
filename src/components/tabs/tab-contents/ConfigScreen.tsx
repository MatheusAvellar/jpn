import Dialog from "@/components/ui/dialog/Dialog";
import { settingsOptions, useSettings } from "@/utils/settings";
import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { settingsBigRedButtonStyle, settingsMessageStyle } from "./styles.css";


export default function ConfigScreen() {
	const { settings, updateSetting, resetSettings } = useSettings();

	const messageElement = useRef<HTMLSpanElement>(null);
	let timeoutTimer: number | undefined = undefined;

	const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

	function onSettingChanged(
		event: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
		key: string
	) {
		updateSetting(key, event.target.value);
		if(messageElement.current) {
			messageElement.current.classList.add("shown");
			clearTimeout(timeoutTimer);
			timeoutTimer = setTimeout(() => {
				messageElement.current?.classList.remove("shown");
			}, 1000);
		}
	}

	return <>
		<div>
			<span ref={messageElement} className={settingsMessageStyle}>
				<FormattedMessage id="settings.msg-saved"/>
			</span>
		</div>
		<div>
			<ol>
				{Object.keys(settings).map((k, i) => {
					const key = k as keyof typeof settings;
					const options = k as keyof typeof settingsOptions;
					return (
						<li key={i}>
							<dl>
								<dt>
									<strong>{k}</strong>
								</dt>
								<dd>
									<select
										onChange={(evt) => onSettingChanged(evt, k)}
										value={settings[key]}
									>
										{settingsOptions[options].map((opt, idx) => {
											return (
												<option key={idx} value={opt}>{opt}</option>
											);
										})}
									</select>
								</dd>
							</dl>
						</li>
					);
				})}
			</ol>
			<button
				className={settingsBigRedButtonStyle}
				onClick={() => setIsDialogOpen(true)}
			>
				<FormattedMessage id="settings.btn-reset"/>
			</button>
		</div>
		<Dialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
			<h2 style={{ margin: 0 }}>
				<FormattedMessage id="settings.btn-reset"/>
			</h2>
			<p><FormattedMessage id="settings.msg-are-you-sure"/></p>
			<hr/>
			<div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
				<button
					onClick={() => setIsDialogOpen(false) }
				>
					<FormattedMessage id="settings.btn-dont-reset"/>
				</button>
				<button
					className={settingsBigRedButtonStyle}
					onClick={() => {
						resetSettings();
						setIsDialogOpen(false);
					}}
				>
					<FormattedMessage id="settings.btn-reset-for-real"/>
				</button>
			</div>
		</Dialog>
	</>;
};
