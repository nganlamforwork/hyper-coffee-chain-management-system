import { auth } from '@/auth';
import { db } from '@/lib/db';
import { CreateAccountSchema } from '@/schemas/users';
import { getUserByEmail } from '@/server/data/user';
import { User } from '@/types/user';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const session = await auth();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized', status: 401 });
		}
		const body = await req.json();

		const validatedFields = CreateAccountSchema.safeParse(body);
		if (!validatedFields.success) {
			return NextResponse.json({
				error: validatedFields.error.flatten().fieldErrors,
				status: 400,
			});
		}

		const {
			email,
			password,
			name,
			role,
			gender,
			dateOfBirth,
			phone,
			address,
		} = validatedFields.data;

		const existingUser = await getUserByEmail(email);
		if (existingUser) {
			return NextResponse.json({
				error: 'Email already in use!',
				status: 400,
			});
		}
		const user = await db.user.create({
			data: {
				name,
				email,
				password,
				role,
				gender,
				dateOfBirth,
				phone,
				address,
			},
		});
		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json({
			error: 'Failed to create account',
			status: 500,
		});
	}
}

export async function GET(req: Request) {
	try {
		const session = await auth();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized', status: 401 });
		}
		const users = await db.user.findMany({
			where: {
				NOT: {
					id: session.user.id,
				},
			},
		});
		return NextResponse.json(users);
	} catch (error) {
		return NextResponse.json({
			error: 'Failed to get all accounts',
			status: 500,
		});
	}
}

export async function PUT(req: Request) {
	try {
		const session = await auth();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized', status: 401 });
		}
		const userToUpdate: User = await req.json();
		const user = await db.user.update({
			where: {
				id: userToUpdate.id,
			},
			data: userToUpdate,
		});
		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json({
			error: 'Failed to update account',
			status: 500,
		});
	}
}
