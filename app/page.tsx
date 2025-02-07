import React from 'react';
import AsidePanel from '../components/aslide';
import SearchInput from '@/components/searchNotes';

const Dashboard = async () => {
  return (
    <div className=' flex py-5 md:p-5'>
      <AsidePanel />
      <SearchInput />
    </div>
  );
};

export default Dashboard;