const socket = io();

const param = new URLSearchParams(window.location.search);

if (!param.has('name') || !param.has('room')) {
  window.location = 'index.html';
  throw new Error('Name and room are required');
}
const user = {
  name: param.get('name'),
  room: param.get('room'),
};

socket.on('connect', function () {
  socket.emit('enterToChat', user, (resp) => {
    console.log(resp);
  });
});

// escuchar
socket.on('disconnect', function () {
  console.log('Conection lost or finished');
});

// Enviar información
// socket.emit(
//   'createMessage',
//   {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo',
//   },
//   function (resp) {
//     console.log('respuesta server: ', resp);
//   }
// );

// Escuchar información
socket.on('createMessage', function (mensaje) {
  console.log('Server:', mensaje);
});
//escucha cambios de usuarios
socket.on('personsList', function (users) {
  console.log(users);
});

//PRIVATE MESSAGES

socket.on('privateMessage', function (message) {
  console.log(message);
});
