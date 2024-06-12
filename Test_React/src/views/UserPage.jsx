// src/views/UserPage.jsx
import React from 'react';
import UserController from '../controllers/UserController';
import UserView from './UserView';

const UserPage = () => {
  const userController = new UserController();
  const user = userController.getUser();

  return <UserView user={user} />;
};

export default UserPage;
