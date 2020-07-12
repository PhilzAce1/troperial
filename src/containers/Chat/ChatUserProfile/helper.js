import { API, graphqlOperation } from 'aws-amplify';
import axios from 'axios';
import { listUsers } from '../../../libs/graphql';
// import { updateUser } from '../../../graphql/mutations';
// import { getUser } from '../../../graphql/queries';
const userExist = async (data) => {
  if (typeof data !== 'string')
    return console.log('something went wrong ... ');
  const name = data.toLowerCase();
  try {
    // const updatedPerson = await API.graphql(
    //   graphqlOperation(updateUser, {
    //     input: {
    //       id: '60e4d5d5-359b-4e6e-8d32-91412aa92591',
    //       personId: '7b8348d6-1e85-4940-94f5-43755ff4f51f',
    //     },
    //   }),
    // );
    // console.log(updatedPerson);
    // const user = await API.graphql(
    //   graphqlOperation(getUser, {
    //     id: '2ccb90ec-37e5-4c42-9ad0-9924edbc2528',
    //   }),
    // );
    // console.log(user);
    const {
      data: {
        listUsers: { items },
      },
    } = await API.graphql(
      graphqlOperation(listUsers, {
        limit: 1000,
        filter: { username: { eq: name } },
      }),
    );
    if (items.length <= 0)
      return { success: false, data: { id: 'user do not exist' } };

    const userData = items[0];
    if (!userData.personId) {
      console.log("the person's Id is not showing o ");
      return {
        success: false,
        data: {
          personId: userData.personId,
          username: userData.username,
          id: userData.id,
        },
        error: 'personId is missing',
      };
    }
    console.log(userData.username, userData.personId);

    return {
      success: true,
      data: {
        personId: userData.personId,
        username: userData.username,
        id: userData.id,
      },
    };
  } catch (e) {
    console.log(e);
  }
  console.log(data);
};

const getUserPersonId = (data) => {};
const makeApiCall = async (id) => {
  const authToken = localStorage.getItem('authToken');
  try {
    const user = await axios.get(
      `https://persons.api.troperial.com/persons/${id}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );
    const { data: userData } = user;
    return {
      success: true,
      data: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        emailId: userData.emailAddresses[0].emailId,
        email: userData.emailAddresses[0].email,
        username: userData.userAlias,
      },
    };
  } catch (e) {
    console.log(e);
  }
};
const getUserInfo = async (data) => {
  const getPersonId = await userExist(data);
  if (getPersonId.success) {
    try {
      const userData = await makeApiCall(getPersonId.data.personId);
      if (userData.success) {
        return userData;
      }
    } catch (e) {
      console.log(e);
    }
  }
};
export default async function updateUserInfo(data, cb, convoId) {
  const userData = await getUserInfo(data.username);
  if (userData && userData.success && userData.data) {
    cb({ ...userData.data, convoId });
  }
}
