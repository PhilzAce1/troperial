export const getStack = (arr) => {
  if (!Array.isArray(arr)) return 'Not an Array';
  if (arr.length < 1) return 1;

  const currentHighest = arr.reduce((a, b) => {
    return Math.max(a, b);
  }, 0);
  return currentHighest + 1;
};

export const removeStack = (arr, ...value) => {
  if (!Array.isArray(arr)) return 'Not an Array';
  if (arr.length < 1) return 1;
  if (!value) return arr;
  return arr.filter((x) => !value.includes(x));
};
// function to filter the convo
export const filterDup = (arr, key) => {
  return [...new Map(arr.map((x) => [key(x), x])).values()];
};

export const findConvo = (arr, convoId) => {
  if (typeof convoId !== 'string')
    return {
      error: 'Invalid Input',
      convoExist: false,
      convo: {},
      messageLoaded: false,
    };
  convoId = convoId.trim();

  // return c0nc;
  const convo = arr.find((convo) => convo.id === convoId);
  return {
    convoExist: convo ? true : false,
    convo: convo ? convo : {},
    messageLoaded:
      convo &&
      convo.hasOwnProperty('messageLoaded') &&
      convo.messageLoaded === true
        ? true
        : false,
  };
};

export const markAsSeen = async (data, cb1, cb2) => {
  const { id, messages } = data;
  const unseen = messages.filter(
    (msg) => msg.read === false && !messages.isMyMessage,
  );
  if (unseen) {
    unseen.forEach(async (msg) => {
      const { id } = msg;
      cb1({ id });
    });
  }
  // console.log(data);
  // cb2({ id });
  // cb1();
  // cb2();
};
