'use client';

import React from 'react';
import { ModalProvider } from './modal-provider';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
});

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				<QueryClientProvider client={queryClient}>
					<SessionProvider>
						{children}
						<Toaster richColors expand={true} />
						<ModalProvider />
					</SessionProvider>
				</QueryClientProvider>
			</ThemeProvider>
		</>
	);
}
