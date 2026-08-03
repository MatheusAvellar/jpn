import { FormattedMessage, useIntl } from "react-intl";
import { noAIBadgeStyle } from "./styles.css";


export default function Home() {
	const imageAltText = useIntl().formatMessage({ id: "home.human-made", })

	return (
		<div style={{ padding: "1rem" }}>
			<div style={{ float: "left", padding: "1rem 1rem 1rem 0" }}>
				<img src="/logo.svg" style={{ width: "5rem", aspectRatio: 1, display: "block" }}/>
			</div>
			<p>
				<FormattedMessage id="home.msg-welcome-line1"/>
			</p>
			<p>
				<FormattedMessage
					id="home.msg-welcome-line2"
					values={{
						// Replaces <link>...</link> from string
						link: (chunk) => (
							<a href="https://baileysnyder.com/jconj/">{chunk}</a>
						)
					}}/>
			</p>
			<p>
				<FormattedMessage id="home.msg-welcome-line3"/>
			</p>

			<a
				href="https://hinokodo.itch.io/human-made"
				target="_blank"
				className={noAIBadgeStyle}
			>
				<img
					alt={imageAltText}
					src="/human-made.svg"
					style={{ width: "1.5rem" }}
					/>
				<span>
					<FormattedMessage id="home.msg-human-made-project"/>
				</span>
			</a>
		</div>
	);
};
