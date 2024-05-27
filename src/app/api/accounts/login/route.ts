// src/app/api/login/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '@/lib/constant';

export async function POST(req: NextRequest) {
	const { username, password } = await req.json();

	// Replace this with your actual authentication logic
	if (username === "grvx" && password === "password123") {
		// Generate a JWT token
		const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
		return NextResponse.json({ message: "Login successful", token }, { status: 200 });
	} else {
		return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
