import NoteCard from "./notecards";
import AddNotes from "./addNotes";
import custom from "./custom.module.css"
import { useState } from "react";
interface CardDashboardProps {
    AllData: any[];
    refreshData: () => void; // Add this line
}
export default function CardDashboard({ AllData, refreshData }: CardDashboardProps) {
    return (
        <div className=" h-[95%] relative overflow-hidden ">
            <div className={`flex gap-5 flex-wrap items-start justify-center py-5 h-[90%] overflow-y-auto ${custom.scrollbar}`}>
                {AllData.map((ele) => {
                    return <NoteCard key={ele._id} Mynotes={ele} refreshData={refreshData} />
                })}
            </div>
            <div className="absolute bottom-0 w-full  ">
            <AddNotes refreshData={refreshData} />
            </div>
        </div>
    );
}