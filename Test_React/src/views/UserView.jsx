// src/views/UserView.jsx
import React from 'react';

const UserView = ({ user }) => {
  return (
    <div>
      <h1>User Information</h1>
      <p>{user.getUserInfo()}</p>
    </div>
  );
};

export default UserView;
