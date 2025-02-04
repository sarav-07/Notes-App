import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Uri } from "@/lib/db"; // Corrected import path
import Note from "@/lib/model/note";

export async function GET(request) {
    console.log(request)
    const parms=request.query;
    console.log(parms)
    try {
        await mongoose.connect(Uri);
        const data = await Note.find();
        console.log(data)
        return NextResponse.json({ data , parms});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function POST(request) {
    const body =await request.json();
    // console.log(body.name)
    return NextResponse.json({ body});
}