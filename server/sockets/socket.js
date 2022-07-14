const { io } = require('../server');
const User = require('../users/users');

const { createMessage } = require('../utils/utils');

const user = new User();

io.on('connection', (client) => {
  client.on('enterToChat', (data, callback) => {
    if (!data.name || !data.room) {
      return callback({
        error: 'Name/room is required',
      });
    }
    client.join(data.room);
    user.addUserToChat(client.id, data.name, data.room);
    client.broadcast
      .to(data.room)
      .emit('personsList', user.gerUsersByRoom(data.room));
    callback(user.gerUsersByRoom(data.room));
    client.broadcast
      .to(data.room)
      .emit(
        'createMessage',
        createMessage('Admin', `The user  "${data.name}" joined the chat`)
      );
  });

  client.on('disconnect', () => {
    const deletedUser = user.removeUserFromChat(client.id);
    console.log(deletedUser);
    client.broadcast
      .to(deletedUser.room)
      .emit(
        'createMessage',
        createMessage(
          'Admin',
          `The user  "${deletedUser.name}" abandoned the chat`
        )
      );

    client.broadcast
      .to(deletedUser.room)
      .emit('personsList', user.gerUsersByRoom(deletedUser.room));
  });

  client.on('createMessage', (data, callback) => {
    const userChat = user.getUserById(client.id);
    const message = createMessage(userChat.name, data.message);
    client.broadcast.to(userChat.room).emit('createMessage', message);

    callback(message);
  });

  client.on('privateMessage', (data) => {
    const userChat = user.getUserById(client.id);
    const message = createMessage(userChat.name, data.message);
    client.broadcast.to(data.to).emit('privateMessage', message);
  });
});
