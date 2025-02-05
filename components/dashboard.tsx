import NoteCard from "./notecards";
import AddNotes from "./addNotes";
import custom from "./custom.module.css"

interface CardDashboardProps {
    AllData: any[];
}
export default function CardDashboard({ AllData }: CardDashboardProps) {
    // console.log("@@@@@@@@@", AllData)
    // AllData.map((Ele)=>{
    //     console.log("--------------------",Ele)
    // })
    return (
        <div className=" h-[95%] relative overflow-hidden ">
            <div className={`flex gap-5 flex-wrap items-start justify-center py-5 h-[90%] overflow-y-auto ${custom.scrollbar}`}>
                {AllData.map((ele) => {
                    return <NoteCard key={ele._id} Mynotes={ele}/>
                })}
            </div>
            <div className="absolute bottom-0 w-full  ">
                <AddNotes />
            </div>
        </div>
    );
}