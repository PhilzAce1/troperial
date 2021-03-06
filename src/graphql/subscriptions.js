/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateConvoLink = /* GraphQL */ `
  subscription OnCreateConvoLink($convoLinkUserId: ID!) {
    onCreateConvoLink(convoLinkUserId: $convoLinkUserId) {
      id
      user {
        id
        personId
        username
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      convoLinkUserId
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
      convoLinkConversationId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($messageConversationId: ID!) {
    onCreateMessage(messageConversationId: $messageConversationId) {
      id
      author {
        id
        personId
        username
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      author {
        id
        personId
        username
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
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
export const onCreateConversation = /* GraphQL */ `
  subscription OnCreateConversation($messageConversationId: ID!) {
    onCreateConversation(messageConversationId: $messageConversationId) {
      id
      messages {
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
          userId
          accountName
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      personId
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
      messages {
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
          userId
          accountName
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      personId
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
      messages {
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
          userId
          accountName
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      personId
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
      messages {
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
          userId
          accountName
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
      createdAt
      updatedAt
    }
  }
`;
