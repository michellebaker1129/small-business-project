import React from 'react';
import useRole from '../hooks/useRole';


const Dashboard = () => {
  const { isAdmin, isClient, isLoggedOut } = useRole();

  // if the user is an admin, request all users from the database, and render the admin dashboard

  // if the use is a client, render the client dashboard
  
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard;