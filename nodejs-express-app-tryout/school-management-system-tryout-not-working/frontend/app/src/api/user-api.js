import { createResourceId } from '../utils/create-resource-id';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import { wait } from '../utils/wait';
import axios from "axios";

const API_ENDPOINT = '//localhost:3000/v1'

// BOOKMARK: UserApi
class UserApi {
  async updateBasicDetail(user) {
    const accessToken = globalThis.localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${accessToken}` };

    return axios.put(`${API_ENDPOINT}/users/basic_user_detail`,
      user,
      { headers })
      .then(function ({ data }) {
        console.log(data);
      })
      .catch(function (error) {
        console.error('[Auth Api]: ', error);
        reject(new Error('Internal server error'));
      });

    // return axios.put(`${API_ENDPOINT}/helloworld`,
    //   { headers })
    //   .then(function ({ data }) {
    //     console.log(data);
    //   })
    //   .catch(function (error) {
    //     console.error('[Auth Api]: ', error);
    //     reject(new Error('Internal server error'));
    //   });

  }

  async helloworld({ email, password }) {
    return axios.post('//localhost:3000/v1/user/helloworld',
      {
        "email": email,
        "password": password
      })
      .then(function ({ data }) {
        console.log(data);
      })
      .catch(function (error) {
        console.error('[Auth Api]: ', error);
        reject(new Error('Internal server error'));
      });

  }

}

export const userApi = new UserApi();
