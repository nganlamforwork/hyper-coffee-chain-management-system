import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import * as React from 'react';

interface ConfirmEmailProps {
	confirmLink: string;
}

export default function ConfirmEmail({ confirmLink }: ConfirmEmailProps) {
	return (
		<Html lang='en'>
			<Head />
			<Preview>Confirm your email address</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={logoContainer}>
						<Img
							src='/logo-light.svg'
							width={120}
							height={36}
							alt='HyperCoffee'
						/>
					</Section>
					<Heading style={h1}>Confirm your email address</Heading>
					<Text style={heroText}>
						Your confirmation code is below - enter it in your open
						browser window and we'll help you get signed in.
					</Text>

					<Section style={codeBox}>
						<Text style={confirmationCodeText}>{confirmLink}</Text>
					</Section>

					<Text style={text}>
						If you didn't request this email, there's nothing to
						worry about, you can safely ignore it.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: '#ffffff',
	margin: '0 auto',
	fontFamily:
		"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
	margin: '0 auto',
	padding: '0px 20px',
};

const logoContainer = {
	marginTop: '32px',
};

const h1 = {
	color: '#1d1c1d',
	fontSize: '36px',
	fontWeight: '700',
	margin: '30px 0',
	padding: '0',
	lineHeight: '42px',
};

const heroText = {
	fontSize: '20px',
	lineHeight: '28px',
	marginBottom: '30px',
};

const codeBox = {
	background: 'rgb(245, 244, 245)',
	borderRadius: '4px',
	marginBottom: '30px',
	padding: '40px 10px',
};

const confirmationCodeText = {
	fontSize: '30px',
	textAlign: 'center' as const,
	verticalAlign: 'middle',
};

const text = {
	color: '#000',
	fontSize: '14px',
	lineHeight: '24px',
};
