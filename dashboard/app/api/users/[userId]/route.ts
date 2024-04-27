import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function DELETE(
	req: Request,
	{ params }: { params: { userId: string } }
) {
	try {
		const userId = params.userId;
		if (!userId) {
			return NextResponse.json({
				error: 'User Id is missing',
				status: 400,
			});
		}
		const session = await auth();
		if (!session) {
			return NextResponse.json({ error: 'Unauthorized', status: 401 });
		}
		const user = await db.user.delete({
			where: {
				id: userId,
			},
		});
		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json({
			error: 'Failed to delete account',
			status: 500,
		});
	}
}
