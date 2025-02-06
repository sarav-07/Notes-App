import connecting from "../../../../lib/db";
import User from "../../../../lib/model/user";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(request) {
    await connecting();
    try {
        const body = await request.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return NextResponse.json({ message: 'All field required !' }, { status: 400 });
        }
        const existingUser = await User.findOne({ mail: email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = new User({
            user: name,
            mail: email,
            password: hashedPassword
        })
        data.save().then(() => console.log(" congo!!!! User saved "))
        return NextResponse.json({ message: 'congo!!!! User saved ' }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}