import Dialog from "@/components/dialog/Dialog";
import { settingsOptions, useSettings } from "@/utils/settings";
import { useRef, useState } from "react";


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
		<span id="settings-message" ref={messageElement}>
			Settings saved!
		</span>
		<style>{`
#settings-message {
	transition: opacity 200ms linear;
	opacity: 0;
	color: #3c6fdf;
}
#settings-message.shown {
	transition: none;
	opacity: 1;
}
`}</style>
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
											<option
												key={idx}
												value={opt}
											>
												{opt}
											</option>
										);
									})}
								</select>
							</dd>
						</dl>
					</li>
				);
			})}
		</ol>
		<button className="big-red-btn" onClick={() => setIsDialogOpen(true)}>
			Reset settings
		</button>
		<style>{`
button.big-red-btn {
	appearance: none;
	background-color: #ec9898;
	color: #444;
	padding: 0.5rem 1rem;
	border: none;
	font-weight: 600;
}
button.big-red-btn:is(:focus-visible, :active) {
	background-color: #f5b3b3;
}
`}
		</style>
		<Dialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
			<h2 style={{ margin: 0 }}>
				Reset settings
			</h2>
			<p>Are you sure?</p>
			<hr/>
			<div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
				<button
					onClick={() => setIsDialogOpen(false) }
				>
					No sorry I didn't mean it
				</button>
				<button
					className="big-red-btn"
					onClick={() => {
						resetSettings();
						setIsDialogOpen(false);
					}}
				>
					DELETE IT ALL
				</button>
			</div>
		</Dialog>
	</>;
};
