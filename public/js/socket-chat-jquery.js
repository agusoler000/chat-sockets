// const param = new URLSearchParams(window.location.search);

//Reference

const divUsers = $('#divUsuarios');
const formSend = $('#formsend');
const message = $('#messagetxt');
const divChatbox = $('#divChatbox');

const renderUsers = (users) => {
  console.log(users);
  let html = '';
  html += `<li>

    <a href="javascript:void(0)" class="active"> Chat de <span> 
    ${param.get('room')} 
    </span></a>;
  </li>`;

  for (let index = 0; index < users.length; index++) {
    html += `<li>
  <a data-id="${users[index].id}" href="javascript:void(0)" >
  <img   src="assets/images/users/1.jpg"   alt="user-img"    class="img-circle"
    />
    <span
      >${users[index].name}
      <small class="text-success">online</small></span
    ></a
  >
</li>`;
    console.log(html);
  }

  divUsers.html(html);
};

divUsers.on('click', 'a', function () {
  const id = $(this).data('id');
  console.log(id);
  //   socket.emit('privateMessage', { id, message: 'Hola' });
});

formSend.submit('submit', function (e) {
  e.preventDefault();
  if (message.val().trim().length === 0) {
    return;
  }
  socket.emit(
    'createMessage',
    {
      user: param.get('name'),
      // room: params.get('room'),
      message: message.val(),
    },
    function (resp) {
      message.val('');
      renderMessages(resp, true);
      scrollBottom();
    }
  );
});

const renderMessages = (message, me) => {
  let date = new Date(message.time);
  let hour = date.getHours() + ':' + date.getMinutes();
  let html = '';

  let adminClass = 'info';
  if (message.name === 'Admin') {
    adminClass = 'danger';
  }

  if (!me) {
    html = `
    <li class="animated fadeIn">
    <div class="chat-img">
  
      ${
        message.name !== 'Admin'
          ? '<img src="assets/images/users/1.jpg" alt="user" />'
          : ''
      }
    </div>
    <div class="chat-content">
      <h5>${message.name}</h5>
      <div class="box bg-light-${adminClass}">
        ${message.message}
      </div>
    </div>
    <div class="chat-time">${hour}</div>
    </li>
    
    
    `;
  } else {
    html = `
    <li class="reverse">
                              <div class="chat-content">
                                <h5>${message.name}</h5>
                                <div class="box bg-light-inverse">
                                ${message.message}
                                </div>
                              </div>
                              <div class="chat-img">
                                <img src="assets/images/users/5.jpg" alt="user" />
                              </div>
                              <div class="chat-time">${hour}</div>
                            </li>`;
  }
  divChatbox.append(html);
};

function scrollBottom() {
  // selectors
  const newMessage = divChatbox.children('li:last-child');

  // heights
  const clientHeight = divChatbox.prop('clientHeight');
  const scrollTop = divChatbox.prop('scrollTop');
  const scrollHeight = divChatbox.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    divChatbox.scrollTop(scrollHeight);
  }
}
