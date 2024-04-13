'use client';
import React from 'react';
import { ModalProvider } from './modal-provider';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '@/components/ui/sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				{children}
				<Toaster richColors expand={true} />
				<ModalProvider />
			</ThemeProvider>
		</>
	);
}
