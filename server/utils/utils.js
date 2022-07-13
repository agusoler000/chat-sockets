const createMessage = (name, message) => {
  return { name, message, time: new Date().getTime() };
};

module.exports = { createMessage };
