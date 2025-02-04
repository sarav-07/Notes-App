import NoteCard from "./notecards";
import AddNotes from "./addNotes";
export default function CardDashboard() {
    return (
        <div className=" h-[97%] relative ">
            <div className="flex gap-5 flex-wrap items-start justify-center py-5 h-[90%] overflow-y-auto  ">
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
                <NoteCard />
            </div>
            <div className="absolute bottom-0 w-full    ">
                <AddNotes />
            </div>
        </div>
    );
}