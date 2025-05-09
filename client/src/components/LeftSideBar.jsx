import React from 'react';
import UserProfileCard from '../pages/ResipeManagement/UserProfileCard';


export default function LeftSideBar() {
  return (
    <div className="w-80 p-4 fixed py-20 left-0 top-0 h-full bg-gray-50 border-r border-gray-200 overflow-y-auto">
      
      <UserProfileCard />
      
    </div>
  );
}