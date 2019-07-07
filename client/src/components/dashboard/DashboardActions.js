import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn btn-light'>
        <i class='fas fa-user-circle text-primary' /> Edit Profile
      </Link>
      <Link to='/add-media' class='btn btn-light'>
        <i class='fas fa-photo-video text-primary' /> tambah Media
      </Link>
      <Link to='/add-jadwal' class='btn btn-light'>
        <i class='fas fa-calendar-alt text-primary' /> tambah Jadwal
      </Link>
    </div>
  );
};

export default DashboardActions;
