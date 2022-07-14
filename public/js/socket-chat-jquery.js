// const param = new URLSearchParams(window.location.search);

//Reference

const divUsers = $('#divUsuarios');
const formSend = $('#formsend');
const firstTitleOfRoom = $('#firstTitleOfRoom');
const message = $('#messagetxt');
const divChatbox = $('#divChatbox');

const renderUsers = (users) => {
  console.log(users);
  firstTitleOfRoom.html(`  ${param.get('room')} `);
  let html = '';
  html += `<li>

    <a href="javascript:void(0)" class="active"> Chat de <span> 
    ${param.get('room')} 
    </span></a>;
  </li>`;

  for (let index = 0; index < users.length; index++) {
    html += `<li>
  <a data-id="${users[index].id}" href="javascript:void(0)" >
  <img   src="https://escolalluisvives.cat/web/wp-content/uploads/2022/01/person-icon.png"   alt="user-img"    class="img-circle"
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
          ? '<img src="https://media.istockphoto.com/vectors/we-want-you-icon-vector-id1161260292?k=20&m=1161260292&s=170667a&w=0&h=EZOYCnoBLAhFWKLPksPe1xLPseop6ZJWtU8zuiFnyM4=" alt="user" />'
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
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvfpdi6szr1cJp8gZxP0NNZktzpJ00a0Cq2bNfYwXn_jgIl7PUQs2yE-4arnwO0rHgXCg&usqp=CAU" alt="user" />
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
