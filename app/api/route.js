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
    await connecting(); // Ensure database connection

    try {
        const body = await request.json();
        const { noteCount, content, imageUrl, date, time, order } = body;

        // Create a new note with all the fields
        const notes = new Note({
            title: noteCount,
            body: content,
            img: imageUrl,
            date: date,
            time: time,
            order: order,
        });

        await notes.save().then(() => console.log("-----------Note saved successfully ---------"));
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
export async function PUT(request) {
    await connecting();
  
    try {
      const { searchParams } = request.nextUrl;
      const id = searchParams.get("id");
  
      if (!id) {
        return NextResponse.json({ error: "Note ID is required" }, { status: 400 });
      }
  
      const body = await request.json();
      const { title, body: noteBody } = body;
  
      if (!title || !noteBody) {
        return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
      }
  
      const updatedNote = await Note.findByIdAndUpdate(
        id,
        { title, body: noteBody },
        { new: true }
      );
  
      if (!updatedNote) {
        return NextResponse.json({ error: "Note not found" }, { status: 404 });
      }
  
      return NextResponse.json({ success: true, note: updatedNote });
  
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }