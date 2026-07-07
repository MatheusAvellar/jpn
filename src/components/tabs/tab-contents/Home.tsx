import { FormattedMessage } from "react-intl";


export default function Home() {
	return (
		<div style={{ padding: "1rem" }}>
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
		</div>
	);
};
