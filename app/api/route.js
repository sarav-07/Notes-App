import { NextResponse } from "next/server";
import connecting from "../../lib/db"
import Note from "../../lib/model/note";

export async function GET(request) {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get('query')
    console.log(query); 
    await connecting();
    try {
        const Allnotes = await Note.find({ 
            title: { $regex: new RegExp(query, 'i') } 
        });
        return NextResponse.json({Allnotes})
    } catch {
        console.warn("result not found")
    }
}

export async function POST(request) {
    await connecting();

    try {
        const body = await request.json();
        const { noteCount, content } = body;

        const notes = new Note({ title: noteCount, body: content });
        await notes.save().then(() => console.log("-----------Note Saves successsfully ---------"))

        const data = await Note.find();
        return NextResponse.json({ data });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
export async function DELETE(request) {
    await connecting();
    try {
        const {searchParams} =request.nextUrl;
        const query=searchParams.get("query")
        const response= await Note.deleteOne({_id:query})
        console.log(response);
        return NextResponse.json({delete:query})

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
