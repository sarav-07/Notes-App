import NoteCard from "./notecards";
import AddNotes from "./addNotes";
import custom from "./custom.module.css"


interface Prop {
    _id: string;
    title: string;
    body: string;
    date: string,
    time: string,
    order: number
    img?: string;
}
interface CardDashboardProps {
    AllData: Prop[];
    refreshData: () => void; // Add this line
}
export default function CardDashboard({ AllData, refreshData }: CardDashboardProps) {
    return (
        <div className=" h-[95%] relative overflow-hidden ">
            <div className={`flex gap-5 flex-wrap items-start justify-center py-5 h-[90%] overflow-y-auto ${custom.scrollbar}`}>
                {[...AllData]
                    .sort((a, b) => b.order - a.order) // Sorting based on `order`
                    .map((ele) => (
                        <NoteCard key={ele._id} Mynotes={ele} refreshData={refreshData} />
                    ))}
            </div>
            <div className="absolute bottom-0 w-full  ">
                <AddNotes refreshData={refreshData} />
            </div>
        </div>
    );
}