import connecting from "../../../../lib/db";
import User from "../../../../lib/model/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key';

export async function POST(req) {
    await connecting();

    try {
        const body = await req.json(); 
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: 'All fields are required!' }, { status: 400 });
        }

        const existingUser = await User.findOne({ mail :email }); 

        if (!existingUser) {
            return NextResponse.json({ message: 'User not found!' }, { status: 404 });
        }

        const passed = await bcrypt.compare(password, existingUser.password);
        if (!passed) {
            return NextResponse.json({ message: 'Invalid credentials!' }, { status: 401 });
        }

        // Generate JWT Token
        const token = jwt.sign({ email, username: existingUser.name }, SECRET_KEY, { expiresIn: '2d' });

        // Set HTTP-only Cookie
        const response = NextResponse.json({ message: 'Login successful!' }, { status: 200 });
        response.cookies.set({
            name: 'authToken',
            value: token,
            httpOnly: true,  // Prevents access from JavaScript (security)
            secure: process.env.NODE_ENV === 'production', // Secure in production
            sameSite: 'strict', // Prevents CSRF attacks
            maxAge: 2 * 24 * 60 * 60, // 2 days in seconds
            path: '/', // Cookie available for all routes
        });

        return response;

    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
}
