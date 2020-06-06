export const finders = (arr, e) => {
  // let newUser = e;
  if (/^@/.test(e)) {
    e = e.replace('@', '');
  }
  e = e.toLowerCase();
  const conversation = arr.find((convo) => {
    return convo.title === e;
  });
  if (conversation)
    return {
      exist: true,
      conversation,
    };
  return { exist: false };
};
