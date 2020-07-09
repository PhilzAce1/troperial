export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      conversations {
        items {
          id
          convoLinkUserId
          convoLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }

      createdAt
      updatedAt
    }
  }
`;
export const createConvo = /* GraphQL */ `
  mutation CreateConvo(
    $input: CreateConversationInput!
    $condition: ModelConversationConditionInput
  ) {
    createConvo(input: $input, condition: $condition) {
      id
      associated {
        items {
          id
          convoLinkUserId
          convoLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      name
      members
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      # author {
      #   id
      #   username
      #   conversations {
      #     nextToken
      #   }
      #   messages {
      #     nextToken
      #   }
      #   createdAt
      #   updatedAt
      # }
      authorId
      isListing
      isAccountDetail
      accountNumber
      bvnNumber
      primaryBank
      customerAccountNumber
      sortCode
      routingNumber
      externalAccountSubType
      zelleEmail
      userId
      currency
      accountName
      by
      seen
      have
      rate
      need
      content
      conversation {
        id
        messages {
          nextToken
        }
        associated {
          nextToken
        }
        name
        members
        createdAt
        updatedAt
      }
      messageConversationId
      createdAt
      updatedAt
    }
  }
`;

export const createConvoLink = /* GraphQL */ `
  mutation CreateConvoLink(
    $input: CreateConvoLinkInput!
    $condition: ModelConvoLinkConditionInput
  ) {
    createConvoLink(input: $input, condition: $condition) {
      id
      user {
        id
        username
        conversations {
          nextToken
        }
        createdAt
        updatedAt
      }
      convoLinkUserId
      conversation {
        id

        associated {
          nextToken
        }
        name
        members
        createdAt
        updatedAt
      }
      convoLinkConversationId
      createdAt
      updatedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      conversations {
        items {
          conversation {
            members
            id
          }
          id
          convoLinkUserId
          convoLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        conversations {
          items {
            conversation {
              members
              id
            }
            id
            convoLinkUserId
            convoLinkConversationId
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getConvo = /* GraphQL */ `
  query GetConvo($id: ID!) {
    getConvo(id: $id) {
      id
      messages(limit: 10000) {
        items {
          id
          authorId
          isListing
          isAccountDetail
          accountNumber
          bvnNumber
          primaryBank
          customerAccountNumber
          sortCode
          routingNumber
          externalAccountSubType
          zelleEmail
          accountName
          userId
          currency
          seen
          by
          have
          rate
          need
          content
          messageConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      associated {
        items {
          id
          convoLinkUserId
          convoLinkConversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      name
      members
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($messageConversationId: ID!) {
    onCreateMessage(messageConversationId: $messageConversationId) {
      id
      authorId
      isListing
      isAccountDetail
      accountNumber
      bvnNumber
      primaryBank
      customerAccountNumber
      sortCode
      routingNumber
      externalAccountSubType
      zelleEmail
      userId
      accountName
      currency
      seen
      by
      have
      rate
      need
      content
      content
      conversation {
        id
        # messages {
        #   nextToken
        # }
        # associated {
        #   nextToken
        # }
        name
        members
        createdAt
        updatedAt
      }
      messageConversationId
      createdAt
      updatedAt
    }
  }
`;

// export const onCreateConvoLink = /* GraphQL */ `
//   subscription OnCreateConvoLink($convoLinkUserId: ID!) {
//     onCreateConvoLink(convoLinkUserId: $convoLinkUserId) {
//       id
//       user {
//         id
//         username
//         conversations {
//           nextToken
//         }
//         # messages {
//         #   nextToken
//         # }
//         createdAt
//         updatedAt
//       }
//       convoLinkUserId
//       conversation {
//         id
//         # messages {
//         #   nextToken
//         # }
//         # associated {
//         #   nextToken
//         # }
//         name
//         members
//         createdAt
//         updatedAt
//       }
//       convoLinkConversationId
//       createdAt
//       updatedAt
//     }
//   }
// `;

export const onCreateConvoLink = /* GraphQL */ `
  subscription OnCreateConvoLink($convoLinkUserId: ID!) {
    onCreateConvoLink(convoLinkUserId: $convoLinkUserId) {
      id
      # user {
      #   id
      #   personId
      #   username
      #   conversations {
      #     nextToken
      #   }
      # messages {
      #   nextToken
      # }
      # createdAt
      # updatedAt
      # }
      convoLinkUserId
      conversation {
        id
        # messages {
        #   nextToken
        # }
        # associated {
        #   nextToken
        # }
        name
        members
        createdAt
        updatedAt
      }
      convoLinkConversationId
      createdAt
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      # author {
      #   id
      #   username
      #   conversations {
      #     nextToken
      #   }
      #   messages {
      #     nextToken
      #   }
      #   createdAt
      #   updatedAt
      # }
      authorId
      isListing
      isAccountDetail
      accountNumber
      bvnNumber
      primaryBank
      customerAccountNumber
      sortCode
      routingNumber
      externalAccountSubType
      zelleEmail
      userId
      currency
      seen
      by
      have
      rate
      need
      content
      conversation {
        id
        # messages {
        #   nextToken
        # }
        associated {
          nextToken
        }
        name
        members
        createdAt
        updatedAt
      }
      messageConversationId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      # author {
      #   id
      #   username
      #   conversations {
      #     nextToken
      #   }
      #   messages {
      #     nextToken
      #   }
      #   createdAt
      #   updatedAt
      # }
      authorId
      isListing
      isAccountDetail
      accountNumber
      bvnNumber
      primaryBank
      customerAccountNumber
      sortCode
      routingNumber
      externalAccountSubType
      zelleEmail
      userId
      currency
      seen
      by
      have
      rate
      need
      content
      # conversation {
      #   id
      #   messages {
      #     nextToken
      #   }
      #   associated {
      #     nextToken
      #   }
      #   name
      #   members
      #   createdAt
      #   updatedAt
      # }
      messageConversationId
      createdAt
      updatedAt
    }
  }
`;
