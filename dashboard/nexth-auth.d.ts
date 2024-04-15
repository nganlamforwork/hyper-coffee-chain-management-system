import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
	role: 'ADMIN' | 'USER' | 'STAFF' | 'SWITCH_BOARD_STAFF';
};

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}
