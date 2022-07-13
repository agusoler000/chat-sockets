class Users {
  constructor() {
    this.usersInChat = [];
  }

  addUserToChat(id, name, room) {
    let user = {
      id,
      name,
      room,
    };

    this.usersInChat.push(user);
    return this.usersInChat;
  }

  getUserById(id) {
    let user = this.usersInChat.find((person) => person.id === id);
    return user;
  }

  getAllUsers() {
    return this.usersInChat;
  }

  gerUsersByRoom(room) {
    const personsInRoom = this.usersInChat.filter(
      (person) => person.room === room
    );
    return personsInRoom;
  }

  removeUserFromChat(id) {
    const deletedUser = this.getUserById(id);
    this.usersInChat = this.usersInChat.filter((person) => person.id !== id);

    return deletedUser;
  }
}

module.exports = Users;
