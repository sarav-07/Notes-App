import React from 'react';
import AsidePanel from '../components/aslide';
import SearchInput from '@/components/searchNotes';
import NoteCard from '@/components/notecards';
import CardDashboard from '@/components/dashboard';

const Dashboard = async () => {
  return (
    <div className='border-2 border-red-500 flex p-5'>
      <AsidePanel />
      <SearchInput />
    </div>
    // <div className="flex p-5">
    //     <AsidePanel />
    //   <main className="flex-grow px-5 py-2 h-[95vh] ">
    //     <SearchInput />
    //   </main>
    // </div>
  );
};

export default Dashboard;