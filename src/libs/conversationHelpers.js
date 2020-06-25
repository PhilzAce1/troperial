import { API, graphqlOperation } from 'aws-amplify';
import {
  listUsers,
  createUser as CreateUser,
  // createConversation,
  createConvo,
  createMessage as CreateMessage,
  getConvo,
  createConvoLink,
  getUser,
} from './graphql';
export const createUser = async (username) => {
  // TODO createCurrent User should be different from createUser
  // make api request with the id and username to see if user exist

  let newUser = username;
  if (/^@/.test(newUser)) {
    newUser = newUser.replace('@', '');
  }
  newUser = newUser.toLowerCase();
  try {
    const {
      data: {
        listUsers: { items },
      },
    } = await API.graphql(
      graphqlOperation(listUsers, {
        limit: 1000,
        filter: { username: { eq: newUser } },
      }),
    );
    if (items.length > 0) return { success: true, payload: items[0] };
    const {
      data: { createUser: item },
    } = await API.graphql(
      graphqlOperation(CreateUser, { input: { username: newUser } }),
    );
    return { success: true, payload: item };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: e,
    };
  }
};

export const conversationExist = async (user1, user2) => {
  try {
    let result = false;
    let conversationId;
    let convoMember;
    const {
      data: {
        getUser: {
          conversations: { items: conversations },
        },
      },
    } = await API.graphql(graphqlOperation(getUser, { id: user1 }));
    const {
      data: {
        getUser: {
          conversations: { items: otherUserConversations },
        },
      },
    } = await API.graphql(graphqlOperation(getUser, { id: user2 }));
    if (conversations.length < 1 || otherUserConversations < 1)
      return { result };
    for (let x = 0; x < conversations.length; x++) {
      for (let y = 0; y < otherUserConversations.length; y++) {
        if (
          conversations[x].convoLinkConversationId ===
          otherUserConversations[y].convoLinkConversationId
        ) {
          result = true;
          conversationId = conversations[x].convoLinkConversationId;
          convoMember = conversations[x].conversation.members;
          break;
        }
      }
    }

    return { result, conversationId, members: convoMember };
  } catch (e) {
    console.log(e);
  }
};
export const createConversation = async (user1, user2) => {
  const members = [user1.username, user2.username];
  const name = members.join(' and ');
  try {
    const conversation = await API.graphql(
      graphqlOperation(createConvo, { input: { name, members } }),
    );

    const {
      data: {
        createConvo: { id: convoLinkConversationId, members: ppl },
      },
    } = conversation;
    await API.graphql(
      graphqlOperation(createConvoLink, {
        input: { convoLinkUserId: user1.id, convoLinkConversationId },
      }),
    );
    await API.graphql(
      graphqlOperation(createConvoLink, {
        input: { convoLinkUserId: user2.id, convoLinkConversationId },
      }),
    );
    return {
      result: true,
      conversationId: convoLinkConversationId,
      members: ppl,
    };
  } catch (e) {
    console.log(e);
  }
};
export const createMessage = async (
  stackId,
  isListing = false,
  conversationId,
  content,
  authorId,
  by = 'none',
  have = 'none',
  rate = 'none',
  need = 'none',
) => {
  let messageData = {
    createdAt: `${Date.now()}`,
    messageConversationId: conversationId,
    content: content,
    authorId: authorId,
    isListing: isListing,
    by,
    have,
    rate,
    need,
  };
  try {
    const newMessage = await API.graphql(
      graphqlOperation(CreateMessage, { input: messageData }),
    );
    return { stackId, newMessage };
  } catch (e) {
    console.log(e);
  }
};
export const getMessages = async (conversationId) => {
  // return console.log('Hello', conversationId);
  if (typeof conversationId !== 'string')
    return console.log(conversationId, ' is not a string');
  try {
    const {
      data: {
        getConvo: {
          members,
          messages: { items },
        },
      },
    } = await API.graphql(
      graphqlOperation(getConvo, { id: conversationId }),
    );
    if (!members && members.length < 1)
      return console.log('Invalid conversatation Link');
    return items;
  } catch (e) {
    console.log(e);
  }
};
