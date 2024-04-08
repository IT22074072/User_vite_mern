// Dashboard.jsx
import React from 'react';
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-3 max-w-lg w-3/4 mx-auto">
        {/* Your Dashboard content goes here */}
        <h1 className='text-3xl font-semibold text-center my-7'>Admin Dashboard</h1>
      </div>
    </div>
  );
}
