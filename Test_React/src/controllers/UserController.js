import UserModel from '../models/UserModel';

class UserController {
  constructor() {
    this.user = new UserModel('John Doe', 'john.doe@example.com');
  }

  getUser() {
    return this.user;
  }
}

export default UserController;
