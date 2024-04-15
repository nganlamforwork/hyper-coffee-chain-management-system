import React from 'react';
import { ModalProvider } from './modal-provider';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export default async function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();
	return (
		<>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				<SessionProvider session={session}>
					{children}
					<Toaster richColors expand={true} />
					<ModalProvider />
				</SessionProvider>
			</ThemeProvider>
		</>
	);
}
